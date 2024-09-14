import { usePostModal } from "../Context"
import ImageGrid from '../components/ImageModal'; // Ensure the path is correct

export default function App() {
    const { set_post_modal_data } = usePostModal()
  return
    (
        <div className="App">
        <h1 style={{ textAlign: 'center', fontSize: '10rem' }}>Fashion Fiesta</h1>
        <ImageGrid />  {/* Render the ImageGrid component */}
        </div>
  );
}
