import styles from './Community.module.css';
import ImageGrid from '../components/ImageModal'; // Ensure the path is correct

export default function App() {
    return (
        <div className={styles.community}>
            <ImageGrid />  {/* Render the ImageGrid component */}
        </div>
    );
}
