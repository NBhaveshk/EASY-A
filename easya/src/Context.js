import React, { useContext, useState } from 'react';
import PostModal from './components/PostModal';

const AuthContext = React.createContext()
const PostModalContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function usePostModal() {
    return useContext(PostModalContext)
}

export default function Context({ children }) {
    const [wallet_id, set_wallet_id] = useState(null);
    const [post_modal_data, set_post_modal_data] = useState(null);

    function clear_post_modal_data() {
        set_post_modal_data()
    }

    return (
        <AuthContext.Provider value={{ wallet_id, set_wallet_id }}>
            <PostModalContext.Provider value={{ set_post_modal_data, clear_post_modal_data }}>
                {post_modal_data && <PostModal data={post_modal_data} />}
                {children}
            </PostModalContext.Provider>
        </AuthContext.Provider>
    );
}