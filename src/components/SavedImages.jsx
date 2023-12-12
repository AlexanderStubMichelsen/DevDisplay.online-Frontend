import React from "react";
import facade from "../util/apiFacade";



function SavedImages() {

    const fetchDataFromPictures = async () => {
        try {
          const endpoint = 'pictures';
          const method = 'GET';
      
          // Using the fetchData function to get data from the pictures endpoint with a token
          const response = await fetchData(endpoint, method);
      
          // Process the response here
          console.log('Data from pictures endpoint:', response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
    return (
        <div>
       {facade.fetchData('pictures', 'GET')}
        </div>
    );
    }

export default SavedImages;