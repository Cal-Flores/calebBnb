import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getUserReviews } from "../../store/reviews";
import { getUserSpots } from "../../store/spots";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './index.css'

function MyProfile() {
    const history = useHistory()
    const dispatch = useDispatch()
    const userSpots = useSelector((state) => state.spots)
    const userReviews = useSelector((state) => state.reviews)
    const reviewsArr = Object.values(userReviews)
    console.log('kami wa', reviewsArr)
    const spotsArr = Object.values(userSpots)

    useEffect(() => {
        dispatch(getUserSpots())
        dispatch(getUserReviews())
    }, dispatch)
    return (
        <div className="statscont">
            <div className="spotdiv">
                <h2>Spots</h2>
                {spotsArr.map(spot => (
                    <div>
                        {/* <Link className="spotcard" key={spot.id} to={`/spots/${spot.id}`}> */}
                        <Link key={spot.id} to={`/spots/${spot.id}`}>
                            <img src={spot?.previewImage} onError={(e) => { e.target.src = 'https://i0.wp.com/www.careandshare-ut.org/wp-content/uploads/2020/09/image-coming-soon.jpg?fit=1200%2C1200&ssl=1' }} width="200px" height="200px" border-radius="25px"></img>
                        </Link>
                        <div>{spot?.name}</div>
                        <div>${spot?.price} night</div>
                        <div>{spot?.city}, {spot?.state}</div>
                    </div>
                ))}
            </div>
            <div className="reviewdiv">
                <h2>Reviews</h2>
                {reviewsArr.map(review => (
                    <div>
                        <div>{review?.review}</div>
                        <div>{review?.Spot?.name}</div>
                        <div>{review?.stars}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}


export default MyProfile;
