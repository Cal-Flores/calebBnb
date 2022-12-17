import { csrfFetch } from "./csrf";

//CRUD TYPES
const LOAD_ALL_REVIEWS = 'reviews/all-reviews';
const LOAD_USER_REVIEWS = 'reviews/userreviews'
const CREATE_REVIEW = 'reviews/post'
const DELETE_REVIEW = 'reviews/delete'


//regular Ac
const loadAll = reviews => {
    return {
        type: LOAD_ALL_REVIEWS,
        reviews
    }
}
const loadUser = reviews => {
    return {
        type: LOAD_USER_REVIEWS,
        reviews
    }
}
const postReview = review => {
    return {
        type: CREATE_REVIEW,
        review
    }
}
const deleteReview = deleted => {
    return {
        type: DELETE_REVIEW,
        deleted
    }
}



// Thunk AC

export const getAllSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        console.log('get all reviews tthunk', reviews.Reviews);
        dispatch(loadAll(reviews.Reviews));
        return reviews.Reviews;
    }
}

export const getUserReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadUser(reviews.Reviews));
        return reviews.Reviews
    }
}

export const createReview = ({ review, stars, spotId }) => async dispatch => {
    console.log('me thunk is hit', review);
    console.log('me stars', stars);
    console.log('me spot id', spotId);
    console.log('in body', { review, stars });
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, stars })
    })

    if (response.ok) {
        console.log('mission complete');
        const newReview = await response.json();
        dispatch(postReview(newReview));
        return newReview;
    }
    else console.log('dang');
}

export const DeleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const deleted = await response.json();
        dispatch(deleteReview(deleted))
        return deleted;
    }
}

//Reducer

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_ALL_REVIEWS: {
            action.reviews.forEach((review) => {
                newState[review.id] = review;
                console.log('new state revieves', newState);
            })
            return newState;
        }
        case LOAD_USER_REVIEWS: {
            action.reviews.forEach((review) => {
                newState[review.id] = review;
            })
            return newState
        }
        case CREATE_REVIEW: {
            const newState = { ...state }
            newState[action.review.id] = action.review;
            return newState;
        }
        case DELETE_REVIEW: {
            newState = { ...state }
            delete newState[action.deleted]
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
