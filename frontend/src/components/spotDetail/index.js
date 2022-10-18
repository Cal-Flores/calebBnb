import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";


function SpotDetail() {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();
    const spotObj = useSelector((state) => state.spots)
    let { spotId } = useParams();
    //console.log('this my spot id', spotId)
    //console.log('this is spotttt', spotObj)
    const spot = spotObj[spotId];
    console.log('this is spot forver', spot)
    console.log('spots owner id', spot.Owner.id);
    const ownerId = spot.Owner.id;
    console.log('this is true owner id', ownerId)
    const sessionUser = useSelector((state) => state.session.user);
    console.log('session user', sessionUser.id);

    useEffect(() => {
        dispatch(getOneSpot(spotId)).then(setIsLoaded(true))

    }, [dispatch, spotId])





    return (
        <>
            {ownerId === sessionUser.id && <button>Edit</button>}
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
