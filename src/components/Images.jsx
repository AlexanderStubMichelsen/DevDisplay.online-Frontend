import React, { useState, useEffect } from 'react';
import '../css/Images.css';
import facade from '../util/apiFacade';

function Images() {
  const [imageList, setImageList] = useState([]);
  const [image, setImage] = useState({});

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
    const clickedUrl = e.target.src;
    const clickedAlt = e.target.alt;
  
    const clickedImage = 
    {
      "url": clickedUrl,
      "alt": clickedAlt 
    };
    setImage(clickedImage);
    facade.fetchData('pictures/' + facade.getUserName(), 'POST', clickedImage)
  .then((response) => {
    // Handle the response after the POST request
    console.log('Picture saved:', response);
  })
  .catch((error) => {
    // Handle errors if the request fails
    console.error('Error saving picture:', error);
  });
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
