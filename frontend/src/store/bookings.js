import { csrfFetch } from "./csrf"

const LOAD_USER_BOOK = '/bookings/user-bookings'

const loadUser = bookings => {
    return {
        type: LOAD_USER_BOOK,
        bookings
    }
}


export const getUserBookings = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`);

    if (response.ok) {
        const bookings = await response.json();
        dispatch(loadUser(bookings.Bookings))
        return bookings
    }
}


const initialState = {};

const bookingsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_USER_BOOK: {
            action.bookings.forEach((book) => {
                newState[book.id] = book
            })
            return newState
        }
        default:
            return state
    }
}


export default bookingsReducer;
