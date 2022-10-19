import { csrfFetch } from "./csrf";


// CRUD TYPES

const LOAD_SPOTS = '/spots/all-spots';
const LOAD_ONE_SPOT = '/spots/spotId';
const CREATE_SPOT = '/spots/post'
const EDIT_SPOT = '/spots/edit'
const DELETE_SPOT = '/spots/delete';


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

const addOne = newSpot => {
    return {
        type: CREATE_SPOT,
        newSpot
    }
}
const EditOne = editedSpot => {
    return {
        type: EDIT_SPOT,
        editedSpot
    }
}

const DeleteOne = deleted => {
    return {
        type: DELETE_SPOT,
        deleted
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
    //console.log('this is spot id being passed to getOne thunk', spotId);
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const singleSpot = await response.json();
        dispatch(loadOne(singleSpot))
        return singleSpot;
    }
}

export const CreateNewSpot = spotDetails => async dispatch => {
    const { name, address, city, state, country, image, price, description } = spotDetails
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        //need to destructure individually for some reason?
        body: JSON.stringify({
            name, address, city, state, country, image, price, description
        })
    })

    if (response.ok) {
        const newSpot = await response.json()
        dispatch(addOne(newSpot))
        return newSpot;
    }
}

export const EditSpot = ({ formInfo, spotId }) => async dispatch => {
    console.log('this is edit spot package', spotId, formInfo);
    const { name, address, city, state, country, image, price, description } = formInfo;
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address, city, state, country, image, price, description })
    })

    if (response.ok) {
        const editedSpot = await response.json();
        dispatch(EditOne(editedSpot))
        return editedSpot;
    }
}

export const DeleteSpot = (spotId) => async dispatch => {
    console.log('spot id to delete!', spotId);
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const deleted = await response.json();
        dispatch(DeleteOne(deleted))
        return deleted;
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
        case CREATE_SPOT: {
            newState = { ...state }
            //console.log('this is newSpot created', action.newSpot)
            newState[action.newSpot.id] = action.newSpot;
            return newState;
        }
        case EDIT_SPOT: {
            newState = { ...state }
            newState[action.editedSpot.id] = action.editedSpot;
            return newState;
        }
        case DELETE_SPOT: {
            newState = { ...state }
            delete newState[action.deleted]
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
