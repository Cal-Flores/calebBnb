import { csrfFetch } from "./csrf";

//CRUD TYPES
const LOAD_ALL_REVIEWS = 'reviews/all-reviews';


//regular Ac
const loadAll = reviews => {
    return {
        type: LOAD_ALL_REVIEWS,
        reviews
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


//Reducer

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_ALL_REVIEWS: {
            console.log('review reducer reviews', action.reviews)
        }
        default:
            return state;
    }
}

export default reviewsReducer;
