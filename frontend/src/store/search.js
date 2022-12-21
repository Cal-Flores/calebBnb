import { csrfFetch } from "./csrf";
const SEARCH_STATE = '/spots/search'

const searchLoad = searchRes => {
    return {
        type: SEARCH_STATE,
        searchRes
    }
}

export const SearchResult = (reqState) => async dispatch => {
    console.log('my thunk has this payload', reqState)
    const response = await csrfFetch(`/api/spots/search`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
            reqState
        })
    })

    if (response.ok) {
        const searchRes = await response.json()
        dispatch(searchLoad(searchRes.spots))
        return searchRes
    }
}

const initialState = {};

const searchReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case SEARCH_STATE: {
            action.searchRes.forEach((spot) => {
                newState[spot.id] = spot
            })
            return newState
        }
        default:
            return state;
    }
}

export default searchReducer;
