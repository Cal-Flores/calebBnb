import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import SpotCard from '../spotCard'



function AllSpots() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spots)
    console.log('this is spots', spots)
    const spotsArr = Object.values(spots);
    console.log('this is spots arr', spotsArr);

    useEffect(() => {
        dispatch(getAllSpots()).then(setLoaded(true))
    }, [dispatch])

    return (
        <div>
            {loaded && spotsArr.map(spot => <SpotCard key={spot?.id} spot={spot} />)}
        </div>
    )
}

{/* {loaded && spotsArr.map(spot => (
    <Link key={spot.id} to={`/spots/${spot.id}`}>{spot.address}</Link>
))} */}
export default AllSpots;
