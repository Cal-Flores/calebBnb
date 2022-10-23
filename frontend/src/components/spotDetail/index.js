import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getAllSpots, getOneSpot } from "../../store/spots";
import { Link } from "react-router-dom";
import { DeleteSpot } from "../../store/spots";
import "./spotDetail.css"
import AllSpots from "../SplashPage";


function SpotDetail() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [complete, setComplete] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory()
    const spotObj = useSelector((state) => state.spots)
    let { spotId } = useParams();
    const spot = spotObj[spotId];
    //console.log('this is amy', spot);
    //console.log('this is spot forver', spot)
    //console.log('this my spot id', spotId)
    //console.log('this is spotttt', spotObj)


    //const ownerId = spot.Owner?.id;
    //console.log('spots owner id', spot.Owner?.id);
    //console.log('this is true owner id', ownerId)
    const sessionUser = useSelector((state) => state.session.user);
    //console.log('session user', sessionUser);
    //console.log('this spot', spot)
    //console.log('preview image', spot.previewImage)

    useEffect(() => {
        dispatch(getOneSpot(spotId)).then(setIsLoaded(true))

    }, [dispatch])

    const deleterr = (e) => {
        e.preventDefault();
        dispatch(DeleteSpot(spotId));
        dispatch(getAllSpots())
        history.push('/')
    }


    return (



        <>
            <div className="detailcontainer">
                <div className="outer">
                    <h1 className="header" >{spot?.name}</h1>
                    <span className="reviewsLink">

                    </span>
                </div>
                <div className="det">
                    <span className="stars"> &#9733; {spot?.avgRating} &#8729;</span>  <Link className="revieew" key={spotId} to={`/spots/reviews/${spotId}`}>Reviews</Link>{spot?.city},   {spot?.state},   {spot?.country}
                </div>
                <div >
                    <img className="imgcontainer" src={spot?.previewImage} width="700" height="350" border-radius="25px"></img>
                </div>
                <div className="ownername">Entire home hosted by {spot?.Owner?.firstName}</div>
                <div className="spotprice">{spot?.price}$ <span className="pernight">night</span></div>


                <div>
                    <div className="linkdiv">
                        <span className="editbtnn">{spot?.Owner?.id === sessionUser?.id && <Link key={spotId} to={`/spots/edit/${spotId}`}>Edit</Link>}</span>
                        {spot?.Owner?.id === sessionUser?.id && <button onClick={deleterr}>Delete</button>}
                    </div>
                </div>
            </div >
        </>
    )
}


export default SpotDetail;
