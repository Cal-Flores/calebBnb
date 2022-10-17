import { csrfFetch } from "./csrf";


// CRUD TYPES

const LOAD_SPOTS = '/spots/all-spots';


// regular AC

const loadAll = spots => {
    console.log('this is in ac', spots)
    return {
        type: LOAD_SPOTS,
        spots
    }
}

//thunk AC

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadAll(list.spots))
        console.log('this is list', list.spots);
        return list.spots;
    }
}


//reducer
const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_SPOTS: {
            console.log('being passed in case', action.spots)
            action.spots.forEach((spot) => {
                newState[spot.id] = spot;
            })
            console.log('this is get all spots newState.....', newState)
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
