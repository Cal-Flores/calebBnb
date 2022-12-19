import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { getUserBookings } from "../../store/bookings";



function EditBooking() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { bookingId } = useParams()
    const userBookings = useSelector((state) => state.bookings)
    const bookingsArr = Object.values(userBookings)
    const currBooking = bookingsArr.find(book => book.id == bookingId)
    console.log('curr booking', currBooking)

    let [startDate, setStartDate] = useState(currBooking?.startDate);
    let [endDate, setEndDate] = useState(currBooking?.endDate);


    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])

    const newBooking = async (e) => {
        e.preventDefault()
        let data = { startDate, endDate }
        const payload = { formInfo: data, bookingId }
        await dispatch(EditBooking(payload)).then(() => dispatch(getUserBookings()))
        history.push(`/my-profile`)
    }

    return (
        <div>
            <form>
                <div>
                    <div>Check-in Date</div>
                    <label>
                        <input
                            type='text'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <div>Checkout Date</div>
                    <label>
                        <input
                            type='text'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                </div>
                <button onClick={newBooking}>
                    Reserve
                </button>
            </form>
        </div>
    )
}

export default EditBooking;
