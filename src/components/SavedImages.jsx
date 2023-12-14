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
                        <img key={index} src={picture.url} alt={`Picture ${index}`} />
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
