import { csrfFetch } from "./csrf"

const LOAD_USER_BOOK = '/bookings/user-bookings'
const POST_BOOKING = '/bookings/post'

const loadUser = bookings => {
    return {
        type: LOAD_USER_BOOK,
        bookings
    }
}

const postBook = newBooking => {
    return {
        type: POST_BOOKING,
        newBooking
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

export const postNewBooking = ({ startDate, endDate, spotId }) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate })
    })

    if (response.ok) {
        const newBooking = await response.json();
        dispatch(postBook(newBooking))
        return newBooking
    }
}

export const deleteOneBooking = (bookId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const deleted = await response.json();
        return deleted
    }
}

export const editBooking = ({ formInfo, bookingId }) => async dispatch => {
    console.log('forminfo in edit booking', formInfo)
    const { startDate, endDate } = formInfo
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate })
    })
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
        case POST_BOOKING: {
            const newState = { ...state }
            newState[action.newBooking.id] = action.newBooking;
            return newState
        }
        default:
            return state
    }
}


export default bookingsReducer;
