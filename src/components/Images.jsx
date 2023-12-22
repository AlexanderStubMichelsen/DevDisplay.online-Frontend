import React, { useState, useEffect } from 'react';
import '../css/Images.css';
import facade from '../util/apiFacade';
import NavBar from './NavBar';
import StarRating from './StarRating';

function Images() {
  const [imageList, setImageList] = useState([]);
  const [image, setImage] = useState({});
  const [selectedStars, setSelectedStars] = useState(0);

  useEffect(() => {
    const accessKey = '6txTsQqD6LOmxYEbY9XG7cawzA7_el54xcjdNeW-4AM'; // Replace with your Unsplash access key
    const apiUrl = `https://api.unsplash.com/photos/?client_id=${accessKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const images = data.map((photo) => ({
          id: photo.id,
          url: photo.urls.small,
          alt: photo.alt_description || 'Image',
        }));
        setImageList(images);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const HandleOnClick = (e) => {
    const clickedUrl = e.target.src;
    const clickedAlt = e.target.alt;
  
    const clickedImage = {
      url: clickedUrl,
      alt: clickedAlt,
    };

    setImage(clickedImage);

    // Sample facade call to save the clicked image (adjust according to your API)
    facade.fetchData('pictures/' + facade.getUserName(), 'POST', clickedImage)
      .then((response) => {
        console.log('Picture saved:', response);
      })
      .catch((error) => {
        console.error('Error saving picture:', error);
      });
  };

  return (
    <>
      <NavBar />
      <div>
        <h1>Images from Unsplash</h1>
        <div className="image-grid">
          {imageList.map((image) => (
            <div key={image.id}>
              <img onClick={HandleOnClick} src={image.url} alt={image.alt} className="image-item" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Images;
