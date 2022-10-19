import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { createReview, DeleteReview, getAllSpotReviews } from "../../store/reviews";
import ReviewCard from "../ReviewCard";

function ReviewSpot() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    //console.log('spotId', spotId);
    const spotsObj = useSelector((state) => state?.spots);
    //console.log('spotsobjet', spotsObj);
    const reviews = useSelector((state) => Object.values(state?.reviews));
    console.log('reviews in compponent', reviews);
    const sessionUser = useSelector((state) => state?.session?.user);
    console.log('sessionUser is', sessionUser);

    const [reviewd, setReviewed] = useState(true)
    // const [owner, setOwner] = useState(false);


    // useEffect(() => {
    //     if (sessionUser && reviews) {
    //         reviews.map(review => {
    //             if (sessionUser.id === review.userId) {
    //                 setReviewed(false);
    //             }
    //         })
    //     }
    // }, [sessionUser, reviews])

    let reviewed = true;
    if (sessionUser && reviews) {
        reviews.map(review => {
            if (sessionUser.id === review.userId) {
                reviewed = false;
            }
        })
    }


    useEffect(() => {
        dispatch(getAllSpotReviews(spotId));
    }, [dispatch, spotId])

    const reviewBtn = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/create-review`)
    }

    const deleter = (e) => {
        e.preventDefault();
        dispatch(DeleteReview())
    }

    const reviewer = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/create-review`)
    }



    return (
        <>
            <h1>Reviews</h1>
            <div>{reviews.map(review => (
                <ReviewCard review={review} />
            ))}
            </div>
            <div>
            </div>


            <div>
                {reviewed &&
                    <button onClick={reviewer}>Leave a Review?</button>
                }
            </div>

        </>
    )
}
// {reviews.map(review => (
//     review.userId !== sessionUser.id &&
//     <button>Leave a Review?</button>
// ))}

export default ReviewSpot;
