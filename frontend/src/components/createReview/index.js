import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview, getAllSpotReviews } from "../../store/reviews";
import "./createSpot.css"




function CreateReiew({ hideModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('');
    let [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([])
    const { spotId } = useParams();


    useEffect(() => {
        const validateError = [];

        if (stars > 5 || stars <= 0) validateError.push('Stars must be between 1 and 5');
        if (review.length < 5 || review.length > 200) validateError.push('Review must be between 5 and 200 characters')

        setErrors(validateError);
    }, [stars, review])

    const reviewSub = async (e) => {
        e.preventDefault();
        stars = Number(stars);
        const payload = { review, stars, spotId }
        await dispatch(createReview(payload))
        await dispatch(getAllSpotReviews(spotId))
        //console.log('the review in comp', payload);
        hideModal()
    }

    return (
        <div className="crrcont">
            <div className="crrwrapper">
                <div className="crlogo">
                    <i class="fa-brands fa-airbnb"></i>
                </div>
                <div className="crreviewwheader"> Create Review</div>
                <form className="crouter-form">
                    <ul className="crrerrors">
                        {errors.length > 0 &&
                            errors.map(error => (
                                <li key={error}>{error}</li>
                            ))
                        }
                    </ul>
                    <label>
                        <input
                            className="crrinput crreview"
                            type='textarea'
                            placeholder='Review'
                            required
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            className="crrinput"
                            type='number'
                            placeholder='Stars'
                            required
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                        />
                    </label>
                    <button className="crsendBtn"
                        onClick={reviewSub}
                        disabled={!!errors.length}
                    >
                        Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateReiew;
