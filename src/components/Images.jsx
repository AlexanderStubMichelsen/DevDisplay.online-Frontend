import React, { useState, useEffect } from 'react';
import '../css/Images.css';
import facade from '../util/apiFacade';

function Images() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const accessKey = '6txTsQqD6LOmxYEbY9XG7cawzA7_el54xcjdNeW-4AM'; // Replace with your Unsplash access key
    const apiUrl = `https://api.unsplash.com/photos/?client_id=${accessKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const images = data.map((photo) => ({
          id: photo.id,
          url: photo.urls.small,
          urlRaw: photo.urls.full,
          alt: photo.alt_description || 'Image',
        }));
        setImageList(images);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const handleOnClick = (e, id) => {
    e.preventDefault();
    const clickedImage = imageList.find((image) => image.id === id);

    // open the picture in a new tab
    window.open(clickedImage.urlRaw, '_blank');

    console.log('Clicked image:', clickedImage);
  }

  // const handleOnClick = (e) => {
  //   e.preventDefault();
  //   const clickedUrl = e.target.src;
  //   const clickedAlt = e.target.alt;
  
  //   const clickedImage = {
  //     url: clickedUrl,
  //     alt: clickedAlt,
  //   };

  //   facade.fetchData('pictures/' + facade.getUserName(), 'POST', clickedImage)
  //     .then((response) => {
  //       console.log('Picture saved:', response);
  //     })
  //     .catch((error) => {
  //       console.error('Error saving picture:', error);
  //     });
  // };

  return (
    <>
      <div className="images-container">
        <h1 className="images-title">Images from Unsplash</h1>
        <div className="image-grid">
          {imageList.map((image) => (
            <div key={image.id} className="image-card">
              <img 
                onClick={(e) => handleOnClick(e, image.id)} 
                src={image.url} 
                alt={image.alt} 
                className="image-item"
                title={image.alt} // Display alt text as tooltip if available
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Images;
