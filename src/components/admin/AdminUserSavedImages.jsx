import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import facade from "../../util/apiFacade";
import NavBar from "../NavBar";
import "../../css/SavedImages.css";

const totalStars = 5;
const accessKey = '6txTsQqD6LOmxYEbY9XG7cawzA7_el54xcjdNeW-4AM'; // Replace with your Unsplash access key

const AdminUserSavedImages = () => {
    const { username } = useParams();
    const [picturesWithRatings, setPicturesWithRatings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDataFromPictures = async (username) => {
        try {
            setLoading(true);
            setError(null);

            const pictureEndpoint = `pictures/${username}`;
            const pictureResponse = await facade.fetchData(pictureEndpoint, 'GET');

            if (pictureResponse && pictureResponse.length > 0) {
                const ratingsPromises = pictureResponse.map(async (picture) => {
                    try {
                        const ratingsEndpoint = `ratings/${picture.alt}`;
                        const ratingsResponse = await facade.fetchData(ratingsEndpoint, 'GET');
                        return { ...picture, ratings: ratingsResponse };
                    } catch (error) {
                        console.error('Error fetching ratings for picture alt:', picture.alt, error);
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

    useEffect(() => {
        if (username) {
            fetchDataFromPictures(username);
        }
    }, [username]);

    const handleOnClick = async (alt) => {
        try {
            const endpoint = `pictures/picture/${alt}/${username}`;
            await facade.fetchData(endpoint, 'DELETE', true);
            setPicturesWithRatings(prevPictures => prevPictures.filter(picture => picture.alt !== alt));
        } catch (error) {
            console.error('Error deleting picture:', error);
            setError('Error deleting picture. Please try again later.');
        }
    };

    const handleOnRate = async (value, pictureAlt) => {
        try {
            const response = await facade.fetchData(`ratings/${pictureAlt}/${value}/${username}`, 'POST', true);
            console.log('Rating saved:', response);

            const updatedRatingResponse = await facade.fetchData(`ratings/${pictureAlt}`, 'GET');

            const updatedPictures = picturesWithRatings.map(picture => {
                if (picture.alt === pictureAlt) {
                    return { ...picture, ratings: updatedRatingResponse };
                }
                return picture;
            });

            setPicturesWithRatings(updatedPictures);
        } catch (error) {
            console.error('Error saving rating:', error);
            if (error.message === 'Unknown error') {
                setError('User has already rated this image.');
            } else {
                setError('Picture is already rated by you.');
            }
        }
    };

    const deleteRating = async (pictureAlt) => {
        try {
            await facade.fetchData(`ratings/rating/${pictureAlt}/${username}`, 'DELETE', true);
            await fetchDataFromPictures(username); // Fetch updated data after deleting rating
        } catch (error) {
            console.error('Error deleting rating:', error);
            setError('Error deleting rating. Please try again later.');
        }
    };

    const renderRatingStars = (picture) => (
        <div className="rating-section">
            {[...Array(totalStars)].map((_, starIndex) => {
                const ratingValue = starIndex + 1;
                return (
                    <span
                        key={starIndex}
                        onClick={() => handleOnRate(ratingValue, picture.alt)}
                        className={`rating-star ${ratingValue <= (picture.ratings || 0) ? 'active' : ''}`}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );

    return (
        <>
            <NavBar />
            <div className="admin-pictures-container">
                <h1 className="admin-pictures-title">Your Images {username}</h1>
                {loading && <p className="loading-message">Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                {picturesWithRatings.length > 0 ? (
                    <div className="admin-image-grid">
                        {picturesWithRatings.map((picture, picIndex) => (
                            <div key={picture.alt} className="admin-image-card">
                                <img
                                    onClick={() => handleOnClick(picture.alt)}
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
                                <div className="delete-rating">
                                    {picture.ratings && (
                                        <button onClick={() => deleteRating(picture.alt)} className="delete">Delete Rating</button>
                                    )}
                                </div>
                                {renderRatingStars(picture)}
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && <p className="no-pictures-message">No pictures available.</p>
                )}
            </div>
        </>
    );
};

export default AdminUserSavedImages;
