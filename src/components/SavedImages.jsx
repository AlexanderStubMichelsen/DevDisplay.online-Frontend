import React, { useState, useEffect } from "react";
import facade from "../util/apiFacade";
import NavBar from "./NavBar";
import StarRating from "./StarRating";

function SavedImages() {
    const [pictures, setPictures] = useState(null);

    useEffect(() => {
        const fetchDataFromPictures = async () => {
            try {
                const endpoint = 'pictures/' + facade.getUserName();
                const method = 'GET';
                const response = await facade.fetchData(endpoint, method);
                setPictures(response); // Update state with fetched data
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
            
    const handleRate = (value, picture_id) => {
        const updatedPictures = pictures.map((picture) => {
            if (picture.id === picture_id) {
                return { ...picture, rating: value }; // Update the rating for the specific picture
            }
            return picture;
        });

        setPictures(updatedPictures);

        // Sample facade call to save the rating (adjust according to your API)
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
                                    <StarRating selectedStars={picture.rating || 0} onRate={(value) => handleRate(value, picture.id)} />
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
