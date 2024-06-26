import React, { useState, useEffect } from 'react';
import '../css/Images.css';
import facade from '../util/apiFacade'; // Assuming you have a utility file for API calls
import NavBar from './NavBar';

function Images() {
  const [imageList, setImageList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const accessKey = '6txTsQqD6LOmxYEbY9XG7cawzA7_el54xcjdNeW-4AM'; // Replace with your Unsplash access key

  useEffect(() => {
    // Function to fetch images based on current searchTerm
    const fetchImages = async () => {
      try {
        let apiUrl = `https://api.unsplash.com/photos/?client_id=${accessKey}`;
        if (searchTerm) {
          apiUrl = `https://api.unsplash.com/search/photos/?query=${searchTerm}&client_id=${accessKey}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const images = data.results ? // Check if it's a search result or normal photo list
          data.results.map((photo) => ({
            id: photo.id,
            url: photo.urls.small,
            alt: photo.alt_description || 'Image',
            photographer: {
              name: photo.user.name,
              username: photo.user.username,
              profileUrl: photo.user.links.html
            },
            download_location: photo.links.download_location
          })) :
          data.map((photo) => ({
            id: photo.id,
            url: photo.urls.small,
            alt: photo.alt_description || 'Image',
            photographer: {
              name: photo.user.name,
              username: photo.user.username,
              profileUrl: photo.user.links.html
            },
            download_location: photo.links.download_location
          }));

        setImageList(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages(); // Initial fetch when component mounts
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Trigger useEffect to fetch images based on new searchTerm
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    const clickedUrl = e.target.src;
    const clickedAlt = e.target.alt;
    const clickedPhotographer = e.target.dataset.photographerName;
    const clickedPhotographerUsername = e.target.dataset.photographerUsername;
    const clickedPhotographerProfileUrl = e.target.dataset.photographerProfileUrl;
    const clickedDownloadLocation = e.target.dataset.photographerDownloadLocation;
  
    const clickedImage = {
      url: clickedUrl,
      alt: clickedAlt,
      pname: clickedPhotographer,
      puserName: clickedPhotographerUsername,
      puserLink: clickedPhotographerProfileUrl,
      pdownLink: clickedDownloadLocation
    };

    facade.fetchData(`pictures/${facade.getUserName()}`, 'POST', clickedImage)
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
      <div className="images-container">
        <h1 className="images-title">Images</h1>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
        <div className="image-grid">
          {imageList.map((image) => (
            <div key={image.id} className="image-card">
              <img
                onClick={handleOnClick}
                src={image.url}
                alt={image.alt}
                className="image-item"
                title={image.alt}
                data-photographer-name={image.photographer.name}
                data-photographer-username={image.photographer.username}
                data-photographer-profile-url={image.photographer.profileUrl}
                data-photographer-download-location={image.download_location}
              />
              <div className="photographer-info">
                <p>Photographer: {image.photographer.name}</p>
                <p><a href={image.photographer.profileUrl} target="_blank" rel="noreferrer">View Profile</a></p>
                <a href={`${image.download_location}?client_id=${accessKey}`}
                   target="_blank"
                   rel="noreferrer"
                   className='link-2-photo-g'>Link to download</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Images;
