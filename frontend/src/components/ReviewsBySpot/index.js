import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSpotReviews } from "../../store/reviews";

function ReviewSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    //console.log('spotId', spotId);
    const reviews = useSelector((state) => state.spots);
    console.log('reviews in compponent', reviews);


    useEffect(() => {
        getAllSpotReviews(spotId);
    }, [dispatch])


    return (
        <h1>Reviews</h1>
    )
}

export default ReviewSpot;
