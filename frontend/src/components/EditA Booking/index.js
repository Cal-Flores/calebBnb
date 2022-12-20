import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { getUserBookings } from "../../store/bookings";
import './index.css'



function EditBooking({ hideModal, book }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const { bookingId } = useParams()
    const userBookings = useSelector((state) => state.bookings)
    const bookingsArr = Object.values(userBookings)
    const currBooking = bookingsArr.find(book => book.id == bookingId)
    console.log('curr booking', currBooking)

    let [startDate, setStartDate] = useState(book?.startDate.split('T')[0]);
    let [endDate, setEndDate] = useState(book?.endDate.split('T')[0]);


    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])

    const newBooking = async (e) => {
        e.preventDefault()
        let data = { startDate, endDate }
        const payload = { formInfo: data, bookingId }
        await dispatch(EditBooking(payload)).then(() => dispatch(getUserBookings()))
        hideModal()
    }

    return (
        <div className="ebcont">
            <form className="ebform">
                <div className="eblogo"><i class="fa-brands fa-airbnb"></i></div>
                <h2 className="ebtitle">Edit Your Booking</h2>
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
                <button className="ebbtn" onClick={newBooking}>
                    Update Booking
                </button>
            </form>
        </div>
    )
}

export default EditBooking;
