import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { EditReview, getUserReviews } from "../../store/reviews";
import './index.css'

function Editreview({ hideModal, rev }) {
    console.log('REV HERE', rev)
    const dispatch = useDispatch();
    const reviewId = rev?.id

    const [review, setReview] = useState(rev?.review);
    let [stars, setStars] = useState(rev?.stars);
    const [errors, setErrors] = useState([])



    useEffect(() => {
        const validateError = [];

        if (stars > 5 || stars <= 0) validateError.push('stars must be between 1 and 5');
        if (review === '') validateError.push('please leave a review')
        if (review?.length > 100) validateError.push('review cant exceed 50 characters')

        setErrors(validateError);
    }, [stars, review])

    const reviewSub = async (e) => {
        e.preventDefault();
        stars = Number(stars);
        let editedRev = { review, stars }
        const data = { formInfo: editedRev, reviewId }
        await dispatch(EditReview(data)).then(() => dispatch(getUserReviews()))
        hideModal()
    }

    return (
        <div className="recont">
            <div className="rewrapper">
                <div className="relogo">
                    <i class="fa-brands fa-airbnb"></i>
                </div>
                <h1 className="reviewwheader"> Edit Review</h1>
                <form className="reform">
                    <ul className="reerrors">
                        {errors.length > 0 &&
                            errors.map(error => (
                                <li key={error}>{error}</li>
                            ))
                        }
                    </ul>
                    <label>
                        <input
                            className="reinput"
                            type='textArea'
                            placeholder='Review'
                            required
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            className="reinput"
                            type='number'
                            placeholder='Stars'
                            required
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                        />
                    </label>
                    <button className="resendBtn"
                        onClick={reviewSub}
                        disabled={!!errors.length}
                    >
                        Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Editreview;
