import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";



function allSpots() {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spots = useSelector(state => {
        return state.spot.list.map(spotId => state.spot[spotId])
    })

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <ul>
            <li>{spots.name}</li>
        </ul>
    )
}
