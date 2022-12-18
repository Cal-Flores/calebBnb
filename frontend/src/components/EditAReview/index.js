import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { EditReview, getUserReviews } from "../../store/reviews";

function Editreview() {
    const dispatch = useDispatch();
    const history = useHistory()
    const userReviews = useSelector((state) => state.reviews)
    const revArr = Object.values(userReviews)
    const { reviewId } = useParams();
    const currReview = revArr.find(rev => rev.id == reviewId)
    //console.log('this is my curr review', currReview)

    const [review, setReview] = useState(currReview?.review);
    let [stars, setStars] = useState(currReview?.stars);
    const [errors, setErrors] = useState([])


    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch])


    useEffect(() => {
        const validateError = [];

        if (stars > 5 || stars <= 0) validateError.push('stars must be between 1 and 5');
        if (review === '') validateError.push('please leave a review')
        if (review.length > 100) validateError.push('review cant exceed 50 characters')

        setErrors(validateError);
    }, [stars, review])

    const reviewSub = async (e) => {
        e.preventDefault();
        stars = Number(stars);
        let editedRev = { review, stars }
        const data = { formInfo: editedRev, reviewId }
        await dispatch(EditReview(data)).then(() => dispatch(getUserReviews()))
        //console.log('the review in comp', payload);
        history.push(`/my-profile`)
    }

    return (
        <div className="escont">
            <div className="crwrapper">
                <h1 className="reviewwheader"> Edit Review</h1>
                <form className="outer-form">
                    <ul className="errors">
                        {errors.length > 0 &&
                            errors.map(error => (
                                <li key={error}>{error}</li>
                            ))
                        }
                    </ul>
                    <label>
                        <input
                            className="crinput"
                            type='textArea'
                            placeholder='Review'
                            required
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            className="crinput"
                            type='number'
                            placeholder='Stars'
                            required
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                        />
                    </label>
                    <button className="sendBtn"
                        onClick={reviewSub}
                        disabled={!!errors.length}
                    >
                        Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Editreview
