import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import facade from "../../util/apiFacade";
import NavBar from "../NavBar";

const totalStars = 5;

function AdminUsersPictures() {
    const { username } = useParams();
    const [picturesWithRatings, setPicturesWithRatings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDataFromPictures = async (username) => {
        try {
            setLoading(true);
            const pictureEndpoint = `pictures/${username}`;
            const pictureMethod = 'GET';
            const pictureResponse = await facade.fetchData(pictureEndpoint, pictureMethod);

            if (Array.isArray(pictureResponse) && pictureResponse.length > 0) {
                const ratingsPromises = pictureResponse.map(async (picture) => {
                    try {
                        const ratingsEndpoint = `ratings/${picture.id}`;
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

    const handleOnClick = async (id) => {
        try {
            const endpoint = 'pictures/picture/' + id;
            const method = 'DELETE';
            const response = await facade.fetchData(endpoint, method, true);
            console.log('Picture deleted:', response);
            setPicturesWithRatings(prevPictures => prevPictures.filter(picture => picture.id !== id));
        } catch (error) {
            console.error('Error deleting picture:', error);
        }
    };
    
    return (
        <>
            <NavBar />
            <div>
                <h1>{username}'s Images</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : picturesWithRatings.length > 0 ? (
                    <div>
                        {picturesWithRatings.map((picture, picIndex) => {
                            const averageRating = Array.isArray(picture.ratings)
                                ? picture.ratings.reduce((acc, { rating }) => acc + rating, 0) / picture.ratings.length
                                : 0;
                            return (
                                <div key={picture.id}>
                                    <p>{averageRating.toFixed(2)}</p>
                                    <img
                                        onClick={() => handleOnClick(picture.id)}
                                        src={picture.url}
                                        alt={`Picture ${picIndex}`}
                                        title={picture.alt ? picture.alt : `Picture ${picIndex}`} // Display alt text as tooltip if available
                                    />
                                    <div>
                                        {[...Array(totalStars)].map((_, starIndex) => {
                                            const ratingValue = starIndex + 1;
                                            return (
                                                <span
                                                    key={starIndex}
                                                    onClick={() => handleOnRate(ratingValue, picture.id)}
                                                    style={{
                                                        color: ratingValue <= averageRating ? 'yellow' : 'gray',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    ★
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>No pictures found.</p>
                )}
            </div>
        </>
    );
}

export default AdminUsersPictures;
