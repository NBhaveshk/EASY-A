import React, { useContext, useState } from 'react';
import PostModal from './components/PostModal';
import image1 from './assets/img3.jpg';
import image11 from './assets/img1.jpg';
import image12 from './assets/img2.jpg';
import image2 from './assets/img4.jpg';
import image21 from './assets/img5.jpg';
import image22 from './assets/img6.jpg';
import image3 from './assets/image1.jpg';
import image4 from './assets/image4.jpg';
import image5 from './assets/image3.jpg';

const AuthContext = React.createContext()
const PostModalContext = React.createContext()
const CommunityContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function usePostModal() {
    return useContext(PostModalContext)
}

export function useCommunity() {
    return useContext(CommunityContext)
}

export default function Context({ children }) {
    const [wallet_id, set_wallet_id] = useState(null);
    const [post_modal_data, set_post_modal_data] = useState(null);
    const [community_data, set_community_data] = useState([
        {
            id: 1,
            author: "Priyan",
            date: "2021-09-25",
            cover_image: image1,
            images: [image1, image11, image12]
        },
        {
            id: 2,
            author: "Teja",
            date: "2021-09-24",
            cover_image: image2,
            images: [image2, image21, image22]
        },
        {
            id: 3,
            author: "Bhavesh",
            date: "2021-09-23",
            cover_image: image3,
            images: [image3]
        },
        {
            id: 4,
            author: "1",
            date: "2021-09-22",
            cover_image: image4,
            images: [image4]
        },
        {
            id: 5,
            author: "2",
            date: "2021-09-21",
            cover_image: image5,
            images: [image5]
        }
    ]);

    function create_post(data) {
        set_community_data((existing_data) => [...existing_data, data])
    }

    function clear_post_modal_data() {
        set_post_modal_data()
    }

    function logout() {
        set_wallet_id(null)
    }

    return (
        <AuthContext.Provider value={{ wallet_id, set_wallet_id, logout }}>
            <PostModalContext.Provider value={{ set_post_modal_data, clear_post_modal_data }}>
                <CommunityContext.Provider value={{ create_post, community_data }}>
                    {post_modal_data && <PostModal data={post_modal_data} />}
                    {children}
                </CommunityContext.Provider>
            </PostModalContext.Provider>
        </AuthContext.Provider>
    );
}