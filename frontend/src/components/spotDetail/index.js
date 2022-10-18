import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";


function SpotDetail() {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    console.log('this my spot id', spotId)

    const spotObj = useSelector((state) => state.spots)
    console.log('this is spotttt', spotObj)
    const spot = spotObj[spotId];
    console.log('this is spot forver', spot)


    useEffect(() => {
        dispatch(getOneSpot(spotId))

    }, [dispatch, spotId])

    return (
        <>
            <h1>This is spot detail</h1>
            <div>{spot.name}</div>
            <div>{spot.avgRating} Stars</div>
            <div>{spot.price}$</div>
            <div>{spot.adress}</div>
            <div>{spot.city}</div>
            <div>{spot.state}</div>
            <div>{spot.description}</div>
        </>
    )
}


export default SpotDetail;
