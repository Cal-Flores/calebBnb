import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import { Link } from "react-router-dom";
import "./spotDetail.css"


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
    console.log('session user', sessionUser);

    useEffect(() => {
        dispatch(getOneSpot(spotId)).then(setIsLoaded(true))

    }, [dispatch])


    return (

        <div>


            <>
                <div className="outer">
                    <h1 className="header" >{spot?.name}</h1>
                    <div> <span className="stars">{spot?.avgRating} </span>
                        <span className="reviewsLink">
                            <Link key={spotId} to={`/spots/reviews/${spotId}`}>Reviews</Link>
                        </span>
                    </div>
                    <div>
                        {spot?.city},   {spot?.state},   {spot?.country}
                    </div>
                    <div>
                        <img src={spot?.previewImage} width="700" height="350" border-radius="25px"></img>
                    </div>
                    <div>Entire home hosted by {sessionUser.firstName}</div>
                    <div>{spot?.adress}  {spot?.price}$</div>

                    <div>{spot?.description}</div>
                    <div>
                        <div>
                            {spot?.Owner?.id === sessionUser?.id && <Link key={spotId} to={`/spots/edit/${spotId}`}>Edit</Link>}
                        </div>
                        <div>
                            {spot?.Owner?.id === sessionUser?.id && <Link key={spotId} to={`/spots/delete/${spotId}`}>Delete</Link>}
                        </div>
                    </div>
                </div>
            </>


        </div >
    )
}


export default SpotDetail;
