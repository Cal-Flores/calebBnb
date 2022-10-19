import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { createReview, getAllSpotReviews } from "../../store/reviews";

function ReviewSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    //console.log('spotId', spotId);
    const reviews = useSelector((state) => state.spots);
    console.log('reviews in compponent', reviews);



    useEffect(() => {
        getAllSpotReviews(spotId);
    }, [dispatch])

    const reviewBtn = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/create-review`)
    }


    return (
        <>
            <h1>Reviews</h1>
            <button onClick={reviewBtn}>Leave a Review?</button>

        </>
    )
}

export default ReviewSpot;
