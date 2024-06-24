import React, { useState, useEffect } from "react";
import facade from "../util/apiFacade";
import NavBar from "./NavBar";
import "../css/SavedImages.css";

function SavedImages() {
    const [picturesWithRatings, setPicturesWithRatings] = useState(null);
    const [rateChanged, setRateChanged] = useState(false); // New state for triggering useEffect
    const totalStars = 5;

    useEffect(() => {
        const fetchDataFromPictures = async () => {
            try {
                const pictureEndpoint = 'pictures/' + facade.getUserName();
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
    }, [rateChanged]); // Include rateChanged in the dependency array

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
        const updatedPictures = picturesWithRatings.map((picture) => {
            if (picture.id === picture_id) {
                const updatedPicture = { ...picture, rating: value };
                return updatedPicture;
            }
            return picture;
        });

        setPicturesWithRatings(updatedPictures);

        try {
            const response = await facade.fetchData('ratings/' + picture_id + "/" + value, 'POST', true);
            const updatedRatingResponse = await facade.fetchData('ratings/' + picture_id, 'GET');

            const updatedPictureWithRatings = picturesWithRatings.map((picture) => {
                if (picture.id === picture_id) {
                    return { ...picture, ratings: updatedRatingResponse };
                }
                return picture;
            });

            setPicturesWithRatings(updatedPictureWithRatings);

            console.log('Rating saved:', response);
        } catch (error) {
            console.error('Error saving rating:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="user-container">
                <h1 className="user-title">Your Images</h1>
                <div className="image-grid">
                    {picturesWithRatings ? (
                        picturesWithRatings.map((picture, picIndex) => (
                            <div key={picture.id} className="image-card">
                                <img
                                    onClick={() => handleOnClick(picture.id)}
                                    src={picture.url}
                                    alt={`Picture ${picIndex}`}
                                    title={picture.alt ? picture.alt : `Picture ${picIndex}`} // Display alt text as tooltip if available
                                />
                                <p>{picture.ratings.toFixed(2)}</p>
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
