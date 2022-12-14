import { csrfFetch } from "./csrf";


// CRUD TYPES

const LOAD_SPOTS = '/spots/all-spots';
const LOAD_ONE_SPOT = '/spots/spotId';
const LOAD_USER_SPOTS = '/spots/userspots';
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

const loadUser = list => {
    return {
        type: LOAD_USER_SPOTS,
        list
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
        console.log('THUNK this is list', list);
        dispatch(loadAll(list.spots))
        return list.spots;
    }
}

export const getUserSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`);

    if (response.ok) {
        const list = await response.json();
        console.log('user spots thunk list', list)
        dispatch(loadUser(list.spots))
        return list
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
    const { name, address, city, state, country, image, imageTwo, imageThree, price, description } = spotDetails
    //console.log('thunk image', image)
    //console.log('im hit');
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        //need to destructure individually for some reason?
        body: JSON.stringify({
            name, address, city, state, country, image, imageTwo, imageThree, price, description
        })
    })

    if (response.ok) {
        const newSpot = await response.json()
        //if preview true
        //console.log('newspotid', newSpot.id)
        if (image && newSpot) {
            const res = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ url: image, preview: true })
            })
            if (res.ok) {
                const newImg = await res.json();
                newSpot.previewImage = newImg.url;
                console.log('preview is loaded', newImg)
                dispatch(addOne(newSpot))
                return newSpot;
            }
        } else {
            dispatch(addOne(newSpot))
            return newSpot;

        }
        //fetch to image table
    }
    // const res = await csrfFetch(`/api/spots/spotImage/${}`)
}

export const EditSpot = ({ formInfo, spotId }) => async dispatch => {
    console.log('this is edit spot package', spotId, formInfo);
    const { name, address, city, state, country, price, description, image, imageTwo, imageThree } = formInfo;
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address, city, state, country, price, description, image, imageTwo, imageThree })
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
        method: 'DELETE'
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
            // console.log('being passed in case', action.spots)
            action.spots.forEach((spot) => {
                newState[spot.id] = spot;
            })
            //console.log('this is get all spots newState.....', newState)
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
        case LOAD_USER_SPOTS: {
            console.log('reducer list at hand', action.list)
            action.list.forEach((spot) => {
                newState[spot.id] = spot;
            })
            return newState
        }
        case CREATE_SPOT: {
            newState = { ...state }
            //console.log('this is newSpot created', action.newSpot)
            newState[action.newSpot.id] = action.newSpot;
            return newState;
        }
        case EDIT_SPOT: {
            newState = { ...state }
            newState[action.editedSpot.id] = { ...newState[action.editedSpot.id], ...action.editedSpot };
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
