import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { createReview, DeleteReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import './reviewCard.css'

function ReviewCard({ review }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('review prop is', review);
    const sessionUser = useSelector((state) => state?.session?.user);
    //console.log('sessionUser is', sessionUser);
    //console.log('my review Id', review.id)

    //const [reviewd, setReviewed] = useState(true)
    const [owner, setOwner] = useState(false);
    //let reviewed = false


    useEffect(() => {
        if (sessionUser?.id === review?.User?.id) {
            //reviewed = true;
            setOwner(true);
        }
    }, [sessionUser, spotId, review])

    const deleter = (e) => {
        e.preventDefault();
        dispatch(DeleteReview(review.id))
        history.push(`/spots/${spotId}`)
    }

    // const reviewer = (e) => {
    //     e.preventDefault();
    //     history.push(`/spots/${spotId}/create-review`)
    // }

    return (
        //<h1>Review card</h1>
        <>
            <div className="reviewername">{review?.User?.firstName}  {review?.User?.lastName}</div>
            <div className="review">{review?.review}</div>
            <div className="numberstar">{review?.stars} <span className="star">&#9733;</span> </div>
            {owner &&
                <button className="reviewdeletebtn" onClick={deleter}>Delete Comment</button>
            }
            {/* {reviewed &&
                <button onClick={reviewer}>Leave a Review?</button>
            } */}
        </>
    )
}
export default ReviewCard;
