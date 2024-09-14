import { usePostModal } from "../Context"

export default function Community() {
    const { set_post_modal_data } = usePostModal()
    return (
        <main>
            <div>
                <h1>Community</h1>
                <button onClick={() => set_post_modal_data({ id: 1, author: "author", date: "date", cover_image: <img src="https://picsum.photos/400/400" alt="random post" /> })}>Open Post Modal</button>
            </div>
        </main>
    )
}