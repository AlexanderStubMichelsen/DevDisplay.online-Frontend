import React, { useEffect, useState } from "react";
import facade from '../util/apiFacade';
import NavBar from './NavBar';
import '../css/SavedImages.css';

function SavedImages() {
    const [picturesWithRatings, setPicturesWithRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const totalStars = 5;
    const accessKey = '6txTsQqD6LOmxYEbY9XG7cawzA7_el54xcjdNeW-4AM'; // Replace with your Unsplash access key

    useEffect(() => {
        const fetchDataFromPictures = async () => {
            try {
                setLoading(true);
                setError(null); // Clear previous errors
                const pictureEndpoint = `pictures/${facade.getUserName()}`;
                const pictureResponse = await facade.fetchData(pictureEndpoint, 'GET');
                console.log(pictureResponse);

                if (pictureResponse && pictureResponse.length > 0) {
                    const ratingsPromises = pictureResponse.map(async (picture) => {
                        try {
                            const ratingsEndpoint = `ratings/${picture.id}`;
                            const ratingsResponse = await facade.fetchData(ratingsEndpoint, 'GET');
                            return { ...picture, ratings: ratingsResponse };
                        } catch (error) {
                            console.error('Error fetching ratings for picture ID:', picture.id, error);
                            return { ...picture, ratings: null };
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
    }, []);

    const handleOnClick = async (id) => {
        try {
            const endpoint = `pictures/picture/${id}`;
            const response = await facade.fetchData(endpoint, 'DELETE', true);
            console.log('Picture deleted:', response);
            setPicturesWithRatings(prevPictures => prevPictures.filter(picture => picture.id !== id));
        } catch (error) {
            console.error('Error deleting picture:', error);
            setError('Error deleting picture. Please try again later.');
        }
    };

    const handleOnRate = async (value, pictureId) => {
        try {
            const response = await facade.fetchData(`ratings/${pictureId}/${value}/${facade.getUserName()}`, 'POST', true);
            console.log('Rating saved:', response);

            const updatedRatingResponse = await facade.fetchData(`ratings/${pictureId}`, 'GET');

            const updatedPictures = picturesWithRatings.map((picture) => {
                if (picture.id === pictureId) {
                    return { ...picture, ratings: updatedRatingResponse };
                }
                return picture;
            });

            setPicturesWithRatings(updatedPictures);
        } catch (error) {
            console.error('Error saving rating:', error);
            setError('Error saving rating. Please try again later.');
        }
    };

    return (
        <>
            <NavBar />
            <div className="admin-pictures-container">
                <h1 className="admin-pictures-title">Your Images {facade.getUserName()}</h1>
                {loading ? (
                    <p className="loading-message">Loading...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : picturesWithRatings.length > 0 ? (
                    <div className="admin-image-grid">
                        {picturesWithRatings.map((picture, picIndex) => (
                            <div key={picture.id} className="admin-image-card">
                                <img
                                    onClick={() => handleOnClick(picture.id)}
                                    src={picture.url}
                                    alt={`Picture ${picIndex}`}
                                    title={picture.alt ? picture.alt : `Picture ${picIndex}`}
                                    className="admin-image-item"
                                />
                                <div className="photographer-info">
                                    <p>Photographer: {picture.pname}</p>
                                    <p><a href={picture.puserLink} target="_blank" rel="noreferrer">View Profile</a></p>
                                    <a href={`${picture.pdownLink}?client_id=${accessKey}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className='link-2-photo-g'>Link to download</a>
                                    <br />
                                    <a href={`${picture.url}?client_id=${accessKey}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className='link-2-photo-g'>Link to full size</a>
                                </div>
                                <div className="rating-section">
                                    {[...Array(totalStars)].map((_, starIndex) => {
                                        const ratingValue = starIndex + 1;
                                        return (
                                            <span
                                                key={starIndex}
                                                onClick={() => handleOnRate(ratingValue, picture.id)}
                                                className={`rating-star ${ratingValue <= (picture.ratings || 0) ? 'active' : ''}`}
                                            >
                                                ★
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-pictures-message">No pictures available.</p>
                )}
            </div>
        </>
    );
}

export default SavedImages;
