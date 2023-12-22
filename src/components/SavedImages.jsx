import React, { useState, useEffect } from "react";
import facade from "../util/apiFacade";
import NavBar from "./NavBar";
import StarRating from "./StarRating";

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
            const endpoint = 'pictures/' + id;
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
                // Update the picture's rating and include it in the response
                const updatedPicture = { ...picture, rating: value };
                return updatedPicture;
            }
            return picture;
        });
    
        setPicturesWithRatings(updatedPictures);
    
        try {
            // Save the rating and retrieve the updated rating for the picture
            const response = await facade.fetchData('ratings/' + picture_id + "/" + value, 'POST', true);
            const updatedRatingResponse = await facade.fetchData('ratings/' + picture_id, 'GET');
    
            // Update the picture's rating directly with the new value
            const updatedPictureWithRatings = picturesWithRatings.map((picture) => {
                if (picture.id === picture_id) {
                    return { ...picture, ratings: updatedRatingResponse }; // Assuming updatedRatingResponse is the new rating
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
            <div>
                <div>
                    <h1>Saved Images</h1>
                    // Inside the component's return statement
{picturesWithRatings ? (
    <div>
        {picturesWithRatings.map((picture, picIndex) => ( // Change the variable name here
            <div key={picture.id}>
                <img
                    onClick={() => handleOnClick(picture.id)}
                    src={picture.url}
                    alt={`Picture ${picIndex}`} // Update variable name here
                />
                <div>
                    {[...Array(totalStars)].map((_, starIndex) => { // Change the variable name here
                        const ratingValue = starIndex + 1; // Update the way you calculate ratingValue
                        return (
                            <span
                                key={starIndex}
                                onClick={() => handleOnRate(ratingValue, picture.id)}
                                style={{
                                    color: ratingValue <= picture.ratings ? 'yellow' : 'gray',
                                    cursor: 'pointer',
                                }}
                            >
                                ★
                            </span>
                        );
                    })}
                </div>
                <div>
                    <p>Average Rating: {picture.ratings.toFixed(2)}</p>
                </div>
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
