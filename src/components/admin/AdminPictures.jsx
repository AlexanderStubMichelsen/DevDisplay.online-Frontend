import React, { useEffect, useState } from 'react';
import facade from '../../util/apiFacade.js';
import NavBar from '../NavBar.jsx';
import '../../css/AdminPictures.css'; // Import the CSS file for styling

const Admin = () => {
    const [picturesWithRatings, setPicturesWithRatings] = useState(null);
    const accessKey = '6txTsQqD6LOmxYEbY9XG7cawzA7_el54xcjdNeW-4AM'; // Replace with your Unsplash access key
    const totalStars = 5;

    useEffect(() => {
        const fetchDataFromPictures = async () => {
            try {
                const pictureEndpoint = 'pictures/';
                const pictureMethod = 'GET';
                const pictureResponse = await facade.fetchData(pictureEndpoint, pictureMethod);

                if (pictureResponse && pictureResponse.length > 0) {
                    const ratingsPromises = pictureResponse.map(async (picture) => {
                        try {
                            const ratingsEndpoint = 'ratings/' + picture.id;
                            const ratingsMethod = 'GET';
                            const ratingsResponse = await facade.fetchData(ratingsEndpoint, ratingsMethod);
                            return { ...picture, ratings: ratingsResponse };
                        } catch (error) {
                            console.error('Error fetching ratings for picture ID:', picture.id, error);
                            return picture;
                        }
                    });

                    const picturesWithRatings = await Promise.all(ratingsPromises);
                    setPicturesWithRatings(picturesWithRatings);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataFromPictures();
    }, []);

    const handleOnClick = async (id) => {
        try {
            const endpoint = 'pictures/picture/' + id;
            const method = 'DELETE';
            const response = await facade.fetchData(endpoint, method, true);
            console.log('Picture deleted:', response);
            setPicturesWithRatings(prevPictures => prevPictures.filter(picture => picture.id !== id));
        } catch (error) {
            console.error('Error deleting picture:', error);
        }
    }

    const handleOnRate = async (value, picture_id) => {
        try {
            // Save the rating
            const response = await facade.fetchData('ratings/' + picture_id + "/" + value, 'POST', true);
            console.log('Rating saved:', response);

            // Retrieve the updated rating for the picture
            const updatedRatingResponse = await facade.fetchData('ratings/' + picture_id, 'GET');

            // Update the picture's rating in state
            const updatedPictures = picturesWithRatings.map((picture) => {
                if (picture.id === picture_id) {
                    return { ...picture, ratings: updatedRatingResponse };
                }
                return picture;
            });

            setPicturesWithRatings(updatedPictures);
        } catch (error) {
            console.error('Error saving rating:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="admin-container">
                <h1 className="admin-title">Your Images</h1>
                <div className="image-grid">
                    {picturesWithRatings ? (
                        picturesWithRatings.map((picture, picIndex) => (
                            <div key={picture.id} className="image-card">
                                <img
                                    onClick={() => handleOnClick(picture.id)}
                                    src={picture.url}
                                    alt={`Picture ${picIndex}`}
                                    title={picture.alt ? picture.alt : `Picture ${picIndex}`}
                                />
                                 <div className="photographer-info">
                                    <p>Photographer: {picture.pname}</p>
                                    <p><a href={picture.puserLink} target="_blank" rel="noreferrer">View Profile</a></p>
                                    <a href={`${picture.pdownLink}?client_id=${accessKey}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className='link-2-photo-g'>Link to download</a>
                                        <br/>
                                        <a href={`${picture.url}?client_id=${accessKey}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className='link-2-photo-g'>Link to full size</a>
                                    </div>
                                <div className="rating-section">
                                    {[...Array(totalStars)].map((_, starIndex) => {
                                        const ratingValue = starIndex + 1;
                                        return (
                                            <span
                                                key={starIndex}
                                                onClick={() => handleOnRate(ratingValue, picture.id)}
                                                className={`rating-star ${ratingValue <= picture.ratings ? 'active' : ''}`}
                                            >
                                                ★
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="loading-message">Loading...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Admin;
