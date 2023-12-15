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

    const deletePicture = async (id) => {
        try {
            const endpoint = 'pictures/' + facade.getUserName() + '/' + id;
            const method = 'DELETE';
            const response = await facade.fetchData(endpoint, method, true);
    
            if (response.status === 200 || response.status === 204) {
                // Deletion successful, update state
                setPictures(pictures.filter(picture => picture.id !== id));
                console.log('Picture deleted successfully');
            } else {
                // Handle deletion failure or other statuses here,
                setPictures(pictures.filter(picture => picture.id !== id));
                console.error('Failed to delete picture:', response);
            }
        } catch (error) {
            console.error('Error deleting picture:', error);
        }
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
                                <img
                                    onClick={() => deletePicture(picture.id)}
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
