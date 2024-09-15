import styles from './Login.module.css';
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import CreatorCoverImage from '../components/CreatorCoverImage'
import CreatorClothes from '../components/CreatorClothes'
import CreatorReceipts from '../components/CreatorReceipts'
import CreatorCaption from '../components/CreatorCaption'
import { differenceInCalendarDays } from 'date-fns'
import { useCommunity } from '../Context';
import { useAuth } from '../Context';

export default function Create() {
    const { wallet_id } = useAuth()
    const { create_post } = useCommunity()
    const [step, set_step] = useState(1)
    const [cover_image, set_cover_image] = useState(null)
    const [clothes_images, set_clothes_images] = useState([])
    const [receipt_images, set_receipt_images] = useState([])
    const [caption, set_caption] = useState("")
    const [clothes_data, set_clothes_data] = useState([])
    const [receipt_data, set_receipt_data] = useState([])
    const is_receipt_data_valid = useCallback(() => receipt_data && receipt_data.length > 0 && receipt_data.every(data => data.is_within_two_days), [receipt_data])
    const navigate = useNavigate();

    function next_step() {
        if (step < 4) {
            set_step(step + 1)
        }
    }

    function previous_step() {
        if (step > 1) {
            set_step(step - 1)
        }
    }

    useEffect(() => {
        if (clothes_images.length > 0) {
            const promises = clothes_images.map(image => sendToOpenAI(image.split(',')[1], 'clothes'))
            Promise.all(promises).then(responses => {
                responses = responses.map(response => {
                    response = JSON.parse(response)
                    console.log(response)
                    return {
                        fabric: response?.fabric || "Unknown Fabric",
                        description: response?.description || "No description available"
                    }
                })
                set_clothes_data(responses)
            }
            )
        }
    }, [clothes_images])

    useEffect(() => {
        if (receipt_images.length > 0) {
            const promises = receipt_images.map(image => sendToOpenAI(image.split(',')[1], 'receipt'))
            Promise.all(promises).then(responses => {
                responses = responses.map(response => {
                    response = JSON.parse(response)
                    return {
                        items: response?.items || {},
                        brand: response?.brand || "Unknown Brand",
                        date: response?.date,
                        is_within_two_days: response?.date ? differenceInCalendarDays(Date.now(), new Date(response?.date)) <= 10000 : false
                    }
                })
                set_receipt_data(responses)
            })
        }
    }, [receipt_images])

    function submit_post() {
        create_post({
            id: Date.now(),
            cover_image,
            images: [cover_image, ...clothes_images],
            date: Date.now(),
            author: wallet_id
        })
        navigate("/")
    }

    const sendToOpenAI = async (base64, type) => {
        const apiKey = "sk-y572_ewyYAVZ-iq-hrrGks88wbXaOI6SqbbbL_BXNLT3BlbkFJCJFOq_2nHGJvmAOYgF9yVKimblYY7mVGPLgh7UsykA"; // Read the API key from environment variables
        const endpoint = "https://api.openai.com/v1/chat/completions"; // Correct API endpoint

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`, // Correct header format
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: type === 'receipt'
                                        ? `Given this image of a receipt, extract the items that have been bought, the store/brand name, and the date of purchase.
                      The return value must be in JSON format, do not enclose it in any comments. This is an example: {"items": {"item1": quantity1, "item2": quantity2}, "brand": "storeName", "date": "YYYY-MM-DD"}.
                      The items should be those purchased, and the quantity bought. If a quantity cannot be determined, mark it as 1.
                      If a date or brand cannot be identified, return null for them.`
                                        : `Given this image of a cloth, identify the fabric type and provide a very short description about the cloth. 
                      The return value must be in JSON format, do not enclose it in any comments. This is an example: {"fabric":"cloth fabric","description":"a very short description"}.`,
                                },
                                {
                                    type: 'image_url',
                                    image_url: {
                                        url: `data:image/jpeg;base64,${base64}`,
                                    },
                                },
                            ],
                        },
                    ],
                }),
            });

            if (!response.ok) {
                const errorDetails = await response.text(); // Get detailed error message
                console.error('Error details:', errorDetails); // Log error details
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    };

    return (
        <>
            <div>
                <h1>Create</h1>
                {JSON.stringify(clothes_data)}
                {JSON.stringify(receipt_data)}
            </div>
            {step === 1 && <CreatorCoverImage cover_image={cover_image} set_cover_image={set_cover_image} onComplete={next_step} onBack={() => navigate("/")} />}
            {step === 2 && <CreatorClothes clothes_images={clothes_images} set_clothes_images={set_clothes_images} onBack={previous_step} onComplete={next_step} />}
            {step === 3 && <CreatorReceipts receipt_images={receipt_images} set_receipt_images={set_receipt_images} onBack={previous_step} isNextAllowed={is_receipt_data_valid} onComplete={next_step} />}
            {step === 4 && <CreatorCaption cover_photo={cover_image} clothes_images={clothes_images} receipt_images={receipt_images} caption={caption} set_caption={set_caption} onBack={previous_step} onComplete={submit_post} />}
        </>
    )
}