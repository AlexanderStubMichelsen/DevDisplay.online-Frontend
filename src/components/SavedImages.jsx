import React, { useEffect, useState } from "react";
import facade from '../util/apiFacade';
import NavBar from './NavBar';
import '../css/SavedImages.css';

function SavedImages() {
    const [picturesWithRatings, setPicturesWithRatings] = useState([]);
    const [rateChanged, setRateChanged] = useState(false);
    const accessKey = '6txTsQqD6LOmxYEbY9XG7cawzA7_el54xcjdNeW-4AM'; // Replace with your Unsplash access key
    const totalStars = 5;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataFromPictures = async () => {
            try {
                setLoading(true);
                const pictureEndpoint = 'pictures/' + facade.getUserName();
                const pictureResponse = await facade.fetchData(pictureEndpoint, 'GET');

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
                } else {
                    setPicturesWithRatings([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch pictures. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDataFromPictures();
    }, [rateChanged]);

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
    };

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
                    {picturesWithRatings.length > 0 ? (
                        picturesWithRatings.map((picture, picIndex) => (
                            <div key={picture.id} className="image-card">
                                <img
                                    onClick={() => handleOnClick(picture.id)}
                                    src={picture.url}
                                    alt={`Picture ${picIndex}`}
                                    title={picture.alt ? picture.alt : `Picture ${picIndex}`}
                                />
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

export default SavedImages;
