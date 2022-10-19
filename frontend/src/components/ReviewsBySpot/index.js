import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { createReview, getAllSpotReviews } from "../../store/reviews";

function ReviewSpot() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    //console.log('spotId', spotId);
    const spotsObj = useSelector((state) => state.spots);
    console.log('spotsobjet', spotsObj);
    const reviews = useSelector((state) => Object.values(state.reviews));
    console.log('reviews in compponent', reviews);
    // const sessionUser = useSelector((state) => state.session.user);
    // console.log(sessionUser);

    // const myReviews = reviews.filter(review => {

    // })



    useEffect(() => {
        dispatch(getAllSpotReviews(spotId));
    }, [dispatch])

    const reviewBtn = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/create-review`)
    }


    return (
        <>
            <h1>Reviews</h1>
            <div>{reviews.map(review => (
                <div>
                    {review.User.firstName} {review.User.lastName}
                    <Link>{review.review}</Link>
                </div>
            ))}

            </div>
            <button onClick={reviewBtn}>Leave a Review?</button>

        </>
    )
}

export default ReviewSpot;
