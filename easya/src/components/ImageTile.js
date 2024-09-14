import React from "react";
import picture1 from "../assets/image1.jpg";
import picture2 from "../assets/image2.jpg";
import picture3 from "../assets/image3.jpg";
import picture4 from "../assets/image4.jpg";

const ImageTile = ({ imageSrc, altText }) => {
  return (
    <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-1">
      <img
        src={imageSrc}
        alt={altText}
        className="object-cover w-full h-48 sm:h-64 md:h-80 lg:h-96"
      />
    </div>
  );
};

const ImageGrid = () => {
    const imagePaths = [
      "../assets/picture1.jpg",
      "../assets/picture2.jpg",
      "../assets/picture3.jpg",
      "../assets/picture4.jpg",
    ];// Your local images

  return (
    <div className="flex flex-wrap">
      {images.map((image, index) => (
        <ImageTile key={index} imageSrc={image} altText={`Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default ImageGrid;