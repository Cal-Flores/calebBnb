import { csrfFetch } from "./csrf";


// CRUD TYPES

const LOAD_SPOTS = '/spots/all-spots';
const LOAD_ONE_SPOT = '/spots/spotId';


// regular AC

const loadAll = spots => {
    //console.log('this is in ac', spots)
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const loadOne = spot => {
    return {
        type: LOAD_ONE_SPOT,
        spot
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

export const getOneSpot = (spotId) => async dispatch => {
    console.log('this is spot id being passed to getOne thunk', spotId);
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const singleSpot = await response.json();
        dispatch(loadOne(singleSpot))
        return singleSpot;
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
        case LOAD_ONE_SPOT: {
            newState = { ...state };
            console.log('this is getting hit')
            console.log('this is payload', action.spot)
            newState[action.spot.id] = {
                ...newState[action.spot.id],
                ...action.spot,
            }
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
