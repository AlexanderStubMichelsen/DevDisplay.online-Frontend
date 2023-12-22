import React, { useState, useEffect } from "react";
import facade from "../util/apiFacade";
import NavBar from "./NavBar";
import StarRating from "./StarRating";

function SavedImages() {
    const [pictures, setPictures] = useState(null);
    const [selectedStars, setSelectedStars] = useState(0); // Add selectedStars state

    const totalStars = 5;

    useEffect(() => {
        const fetchDataFromPictures = async () => {
            try {
                const pictureEndpoint = 'pictures/' + facade.getUserName();
                const pictureMethod = 'GET';
                const pictureResponse = await facade.fetchData(pictureEndpoint, pictureMethod);
                setPictures(pictureResponse); // Update state with fetched pictures
    
                // Fetch ratings for each picture by its ID
                // Inside the useEffect
        if (pictureResponse && pictureResponse.length > 0) {
            const ratingsPromises = pictureResponse.map(async (picture) => {
            try {
                console.log('Pictures:', picture.id);
                const ratingsEndpoint = 'ratings/' + picture.id; // Correctly uses picture.id instead of pictures.id
                const ratingsMethod = 'GET';
                const ratingsResponse = await facade.fetchData(ratingsEndpoint, ratingsMethod);
                // Assign fetched ratings to the respective picture
                return { ...picture, ratings: ratingsResponse }; // Assuming 'ratings' is a property in the picture object
                } catch (error) {
                console.error('Error fetching ratings for picture ID:', picture.id, error);
                return picture;
                }
                });
  
                // Wait for all rating fetches to complete
                const picturesWithRatings = await Promise.all(ratingsPromises);
                setPictures(picturesWithRatings); // Update state with fetched ratings
                console.log('Pictures with ratings:', picturesWithRatings);
                }
  
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataFromPictures(); // Call the async function within useEffect
    }, []); // Empty dependency array to run once on component mount
    
        
    
    

    const HandleOnClick = async (id) => {
        try {
            const endpoint = 'pictures/' + id;
            const method = 'DELETE';
            const response = await facade.fetchData(endpoint, method, true);
            // Handle the response after the DELETE request
            console.log('Picture deleted:', response);
            setPictures(pictures.filter(picture => picture.id !== id));
        } catch (error) {
            // Handle errors if the request fails
            console.error('Error deleting picture:', error);
        } 
    };
            
    const handleOnRate = (value, picture_id) => {
        const updatedPictures = pictures.map((picture) => {
            if (picture.id === picture_id) {
                return { ...picture, rating: value }; // Update the rating for the specific picture
            }
            return picture;
        });

        setPictures(updatedPictures);

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
                    {pictures ? (
                        <div>
                            {/* Render your pictures here */}
                            {pictures.map((picture, index) => (
                                <div key={index}>
                                    <img
                                        onClick={() => HandleOnClick(picture.id)}
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
                        {/* <p>Rating: {getRating(picture.id)}</p> */}
                    </div>
                                    {/* <StarRating selectedStars={picture.rating || 0} onRate={(value) => handleRate(value, picture.id)} /> */}
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
