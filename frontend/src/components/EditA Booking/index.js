import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { editABooking, getUserBookings } from "../../store/bookings";
import './index.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function EditBooking({ hideModal, book }) {
    const dispatch = useDispatch();
    const bookingId = book?.id

    let [startDate, setStartDate] = useState(new Date(book?.startDate));
    let [endDate, setEndDate] = useState(new Date(book?.endDate));


    const newBooking = async (e) => {
        e.preventDefault()
        let data = { startDate, endDate }
        const payload = { formInfo: data, bookingId }
        await dispatch(editABooking(payload)).then(() => dispatch(getUserBookings()))
        hideModal()
    }

    return (
        <div className="ebcont">
            <form className="ebform">
                <div className="eblogo"><i class="fa-brands fa-airbnb"></i></div>
                <h2 className="ebtitle">Edit Your Booking</h2>
                <div>
                    <div>Check-in Date</div>
                    <DatePicker className="ebcheckinput" selected={startDate} onChange={(date = Date) => setStartDate(date)} />
                </div>
                <div>
                    <div>Checkout Date</div>
                    <DatePicker className="ebcheckinput" selected={endDate} onChange={(date = Date) => setEndDate(date)} />
                </div>
                <button className="ebbtn" onClick={newBooking}>
                    Update Booking
                </button>
            </form>
        </div>
    )
}

export default EditBooking;
