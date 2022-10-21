import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview, getAllSpotReviews } from "../../store/reviews";
import "./createSpot.css"



function CreateReiew() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('');
    let [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([])
    const { spotId } = useParams();


    useEffect(() => {
        const validateError = [];

        if (stars > 5 || stars < 0) validateError.push('stars must be between 0 and 5');
        if (review === '') validateError.push('please leave a review')
        if (review.length > 50) validateError.push('review cant exceed 50 characters')

        setErrors(validateError);
    }, [stars, review])

    const reviewSub = async (e) => {
        e.preventDefault();
        stars = Number(stars);
        const payload = { review, stars, spotId }
        await dispatch(createReview(payload))
        await dispatch(getAllSpotReviews(spotId))
        //console.log('the review in comp', payload);
        history.push(`/spots/reviews/${spotId}`)
    }

    return (
        <>
            <h1 className="header"> Create Review</h1>
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
                        type='textArea'
                        placeholder='Review'
                        required
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </label>
                <label>
                    <input
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
        </>
    )
}

export default CreateReiew;
