import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import CreatorCoverImage from '../components/CreatorCoverImage'
import CreatorClothes from '../components/CreatorClothes'
import CreatorReceipts from '../components/CreatorReceipts'
import CreatorCaption from '../components/CreatorCaption'

export default function Create() {
    const [step, set_step] = useState(1)
    const [cover_image, set_cover_image] = useState(null)
    const [clothes_images, set_clothes_images] = useState([])
    const [receipt_images, set_receipt_images] = useState([])
    const [caption, set_caption] = useState("")
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

    function create_post() {
    }

    return (
        <main>
            <div>
                <h1>Create</h1>
            </div>
            {step === 1 && <CreatorCoverImage cover_image={cover_image} set_cover_image={set_cover_image} onComplete={next_step} onBack={() => navigate("/")} />}
            {step === 2 && <CreatorClothes clothes_images={clothes_images} set_clothes_images={set_clothes_images} onBack={previous_step} onComplete={next_step} />}
            {step === 3 && <CreatorReceipts receipt_images={receipt_images} set_receipt_images={set_receipt_images} onBack={previous_step} onComplete={next_step} />}
            {step === 4 && <CreatorCaption cover_photo={cover_image} clothes_images={clothes_images} receipt_images={receipt_images} caption={caption} set_caption={set_caption} onBack={previous_step} onComplete={create_post} />}
        </main>
    )
}