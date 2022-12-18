import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { DeleteReview, getUserReviews } from "../../store/reviews";
import { DeleteSpot, getUserSpots } from "../../store/spots";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './index.css'
import { getUserBookings } from "../../store/bookings";

function MyProfile() {
    const history = useHistory()
    const dispatch = useDispatch()
    const userSpots = useSelector((state) => state.spots)
    const userReviews = useSelector((state) => state.reviews)
    const userBookings = useSelector((state) => state.bookings)
    const reviewsArr = Object.values(userReviews)
    const spotsArr = Object.values(userSpots)
    const bookingsArr = Object.values(userBookings)
    console.log('this is my selector booinks', bookingsArr)
    useEffect(() => {
        dispatch(getUserSpots())
        dispatch(getUserReviews())
        dispatch(getUserBookings())
    }, [dispatch])

    const deleter = (spotId) => {
        dispatch(DeleteSpot(spotId)).then(() => dispatch(getUserSpots()))
    }
    const revDel = (revId) => {
        dispatch(DeleteReview(revId)).then(() => dispatch(getUserReviews()))
    }
    return (
        <div className="statscont">
            <div className="spotdiv">
                <h2>Spots</h2>
                {spotsArr.map(spot => (
                    <div className="spotwrap">
                        {/* <Link className="spotcard" key={spot.id} to={`/spots/${spot.id}`}> */}
                        <Link key={spot.id} to={`/spots/${spot.id}`}>
                            <img className="profileimage" src={spot?.previewImage} onError={(e) => { e.target.src = 'https://i0.wp.com/www.careandshare-ut.org/wp-content/uploads/2020/09/image-coming-soon.jpg?fit=1200%2C1200&ssl=1' }}></img>
                        </Link>
                        <div>{spot?.name}</div>
                        <div>${spot?.price} night</div>
                        <div>{spot?.city}, {spot?.state}</div>
                        <div>
                            <Link key={spot?.id} to={`/spots/edit/${spot?.id}`}><i class="fa-regular fa-pen-to-square"></i></Link>
                            <div onClick={(e) => { deleter(spot?.id) }}><i class="fa-regular fa-trash-can"></i></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="reviewdiv">
                <h2>Reviews</h2>
                {reviewsArr.map(review => (
                    <div className="spotwrap">
                        <div>
                            <Link key={'no'} to={`/spots/${review?.Spot?.id}`}>{review?.Spot?.name}</Link>
                        </div>
                        <div>{review?.review}</div>
                        <div>{review?.stars} &#9733;</div>
                        <div>
                            <Link key={'to review'} to={`/reviews/edit/${review?.id}`}>
                                <i class="fa-regular fa-pen-to-square"></i>
                            </Link>
                            <div onClick={(e) => { revDel(review?.id) }}>
                                <i class="fa-regular fa-trash-can"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bookingdiv">
                <h2>Bookings</h2>
                <div className="spotwrap">
                    {bookingsArr.map(book => (
                        <div>
                            <div>{book?.Spot?.name}</div>
                            <div>{book?.Spot?.city}, {book?.Spot?.state}</div>
                            <div>Check-in Date: {book?.startDate}</div>
                            <div>Checkout Date: {book?.endDate}</div>
                            <div><i class="fa-regular fa-trash-can"></i></div>
                            <div><i class="fa-regular fa-pen-to-square"></i></div>
                        </div>
                    ))}
                </div>
            </div>

        </div >
    )
}


export default MyProfile;
