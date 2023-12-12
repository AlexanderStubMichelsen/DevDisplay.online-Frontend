import React, { useState, useEffect } from 'react';
import '../css/Images.css';

function Images() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const accessKey = '6txTsQqD6LOmxYEbY9XG7cawzA7_el54xcjdNeW-4AM'; // Replace 'YOUR_ACCESS_KEY' with your Unsplash access key
    const apiUrl = `https://api.unsplash.com/photos/?client_id=${accessKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Extracting image URLs from Unsplash API response
        const images = data.map((photo) => ({
          id: photo.id,
          url: photo.urls.small, // You can use different sizes (e.g., raw, regular, thumb)
          alt: photo.alt_description || 'Image',
        }));
        setImageList(images);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

    const HandleOnClick = (e) => {
        console.log(e.target.src);
        console.log(e.target.alt);
    }

return (
    <div>
      <h1>Images from Unsplash</h1>
      <div className="image-grid">
        {imageList.map((image) => (
          <img onClick={HandleOnClick} key={image.id} src={image.url} alt={image.alt} className="image-item" />
        ))}
      </div>
    </div>
  );
        }

export default Images;
