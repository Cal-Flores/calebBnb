import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";



function CreateReiew() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('');
    let [stars, setStars] = useState(0);
    const { spotId } = useParams();


    const reviewSub = (e) => {
        e.preventDefault();
        stars = Number(stars);
        const payload = { review, stars, spotId }
        dispatch(createReview(payload))
        //console.log('the review in comp', payload);
        //history.push(`/spots/reviews/${spotId}`)
    }

    return (
        <div>
            <h1> Create Review</h1>
            <div>
                <form>
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
                    <button onClick={reviewSub}>Submit</button>

                </form>
            </div>
        </div>


    )
}

export default CreateReiew;
