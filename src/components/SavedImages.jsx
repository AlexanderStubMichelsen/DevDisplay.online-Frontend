import React, { useState, useEffect } from "react";
import facade from "../util/apiFacade";
import NavBar from "./NavBar";

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
            const endpoint = 'pictures/' + id;
            const method = 'DELETE';
            facade.fetchData(endpoint, method, true)
            .then((response) => {
                // Handle the response after the DELETE request
                console.log('Picture deleted:', response);
                setPictures(pictures.filter(picture => picture.id !== id));
            })
            .catch((error) => {
                // Handle errors if the request fails
                console.error('Error deleting picture:', error);
            }); 
    }
            
        
    

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
                                <img
                                    onClick={() => HandleOnClick(picture.id)}
                                    key={index}
                                    src={picture.url}
                                    alt={`Picture ${index}`}
                                />
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
