import { csrfFetch } from "./csrf";

//CRUD TYPES
const LOAD_ALL_REVIEWS = 'reviews/all-reviews';
const CREATE_REVIEW = 'reviews/post'


//regular Ac
const loadAll = reviews => {
    return {
        type: LOAD_ALL_REVIEWS,
        reviews
    }
}
const postReview = review => {
    return {
        type: CREATE_REVIEW,
        review
    }
}


// Thunk AC

export const getAllSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadAll(reviews));
    }
}

export const createReview = ({ review, stars, spotId }) => async dispatch => {
    console.log('me thunk is hit', review);
    console.log('me stars', stars);
    console.log('me spot id', spotId);
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, stars, spotId })
    })

    if (response.ok) {
        console.log('mission complete');
        const newReview = await response.json();
        dispatch(postReview(newReview));
        return newReview;
    }
    else console.log('dang');
}


//Reducer

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_ALL_REVIEWS: {
            console.log('review reducer reviews', action.reviews)
        }
        case CREATE_REVIEW: {
            const newState = { ...state }
            newState[action.review.id] = action.review;
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
