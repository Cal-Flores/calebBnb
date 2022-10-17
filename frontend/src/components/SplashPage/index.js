import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSpots } from "../../store/spots";



function AllSpots() {
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spots)
    console.log('this is spots', spots)
    //const spotsArr = Object.values(spots);

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <ul>

        </ul>
    )
}

export default AllSpots;
