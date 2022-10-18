import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import { Link } from "react-router-dom";


function SpotDetail() {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();
    const spotObj = useSelector((state) => state.spots)
    let { spotId } = useParams();
    const spot = spotObj[spotId];
    //console.log('this is spot forver', spot)
    //console.log('this my spot id', spotId)
    //console.log('this is spotttt', spotObj)


    //const ownerId = spot.Owner?.id;
    //console.log('spots owner id', spot.Owner?.id);
    //console.log('this is true owner id', ownerId)
    const sessionUser = useSelector((state) => state.session.user);
    // console.log('session user', sessionUser?.id);

    useEffect(() => {
        dispatch(getOneSpot(spotId)).then(setIsLoaded(true))

    }, [dispatch, spotId])







    return (

        <div>

            {spot &&
                <>
                    {spot?.Owner?.id === sessionUser?.id && <Link key={spotId} to={`/spots/edit/${spotId}`}>Edit</Link>}
                    <h1>This is spot detail</h1>
                    <div>{spot.name}</div>
                    <div>{spot.avgRating} Stars</div>
                    <div>{spot.price}$</div>
                    <div>{spot.adress}</div>
                    <div>{spot.city}</div>
                    <div>{spot.state}</div>
                    <div>{spot.description}</div>
                </>
            }

        </div>
    )
}


export default SpotDetail;
