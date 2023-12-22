import React, { useState, useEffect } from "react";
import facade from "../util/apiFacade";
import NavBar from "./NavBar";
import StarRating from "./StarRating";

function SavedImages() {
    const [picturesWithRatings, setPicturesWithRatings] = useState(null);
    const [selectedStars, setSelectedStars] = useState(0);
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
    }, []);

    const handleOnClick = async (id) => {
        try {
            const endpoint = 'pictures/' + id;
            const method = 'DELETE';
            const response = await facade.fetchData(endpoint, method, true);
            console.log('Picture deleted:', response);
            setPicturesWithRatings(picturesWithRatings.filter(picture => picture.id !== id));
        } catch (error) {
            console.error('Error deleting picture:', error);
        } 
    };
            
    const handleOnRate = (value, picture_id) => {
        const updatedPictures = picturesWithRatings.map((picture) => {
            if (picture.id === picture_id) {
                return { ...picture, rating: value };
            }
            return picture;
        });

        setPicturesWithRatings(updatedPictures);

        facade.fetchData('ratings/' + picture_id + "/" + value, 'POST', true)
            .then((response) => {
                console.log('Rating saved:', response);
            })
            .catch((error) => {
                console.error('Error saving rating:', error);
            });
    };

    return (
        <>
            <NavBar />
            <div>
                <div>
                    <h1>Saved Images</h1>
                    {picturesWithRatings ? (
                        <div>
                            {picturesWithRatings.map((picture, index) => (
                                <div key={index}>
                                    <img
                                        onClick={() => handleOnClick(picture.id)}
                                        src={picture.url}
                                        alt={`Picture ${index}`}
                                    />
                                    <div>
                                        {[...Array(totalStars)].map((_, index) => {
                                            const ratingValue = index + 1;
                                            return (
                                                <span
                                                    key={index}
                                                    onClick={() => handleOnRate(ratingValue, picture.id)}
                                                    style={{ color: ratingValue <= selectedStars ? 'yellow' : 'gray', cursor: 'pointer' }}
                                                >
                                                    ★
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <div>
                                    <p>Average Rating: {picture.ratings.toFixed(2)}</p>                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default SavedImages;
