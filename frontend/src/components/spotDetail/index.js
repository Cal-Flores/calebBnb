import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getAllSpots, getOneSpot } from "../../store/spots";
import { Link } from "react-router-dom";
import { DeleteSpot } from "../../store/spots";
import "./spotDetail.css"
import AllSpots from "../SplashPage";
import { getAllSpotReviews } from "../../store/reviews";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postNewBooking } from "../../store/bookings";


function SpotDetail() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [complete, setComplete] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory()
    const spotObj = useSelector((state) => state.spots)
    const spotReviews = useSelector((state) => state.reviews)
    let reviewsArr = Object.values(spotReviews)
    console.log('reviewsArr', reviewsArr)
    let { spotId } = useParams();
    const spot = spotObj[spotId];
    console.log('THIS MY SPOT', spot)
    const sessionUser = useSelector((state) => state.session.user);

    let reviwed = true;
    if (sessionUser) {
        reviewsArr?.map(review => {
            if (sessionUser.id === review.userId) {
                reviwed = false
            }
        })
    }

    let [startDate, setStartDate] = useState(new Date());
    let [endDate, setEndDate] = useState(new Date());



    useEffect(() => {
        dispatch(getOneSpot(spotId)).then(setIsLoaded(true))
        dispatch(getAllSpotReviews(spotId))
    }, [dispatch])

    const deleterr = (e) => {
        e.preventDefault();
        dispatch(DeleteSpot(spotId)).then(() => dispatch(getAllSpots()))

        history.push('/')
    }

    const reviewer = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/create-review`)
    }

    const newBook = async (e) => {
        e.preventDefault()
        startDate = startDate.toISOString().split('T')[0];
        endDate = endDate.toISOString().split('T')[0];
        let payload = { startDate, endDate, spotId }
        await dispatch(postNewBooking(payload))
        history.push(`/my-profile`)
    }

    let imageNow;
    let spotImg = spot?.SpotImages
    spotImg?.map(simg => {
        imageNow = simg.url
    })

    return (
        <div className="detailcontainer">
            <div className="outer">
                <h1 className="header" >{spot?.name}</h1>
                <span className="reviewsLink">

                </span>
            </div>
            <div className="det">
                <span className="stars"> &#9733; {spot?.avgRating}</span>&#8729;  <div className="revieew"> {reviewsArr.length} Reviews</div>  <span className="medal"><i class="fa-solid fa-medal"></i></span>
                Superhost &#8729; {spot?.city},   {spot?.state},   {spot?.country}
            </div>
            <div>
                <div className="linkdiv">
                    <span>{spot?.Owner?.id === sessionUser?.id && <Link className="editbtnn" key={spotId} to={`/spots/edit/${spotId}`}><i class="fa-regular fa-pen-to-square"></i></Link>}</span>
                    {spot?.Owner?.id === sessionUser?.id && <button className="deletespotbtn" onClick={deleterr}><i class="fa-regular fa-trash-can"></i></button>}
                </div>
            </div>
            <div className="imgdiv" >
                <img className="imgcontainer" src={imageNow} onError={(e) => { e.target.src = 'https://i0.wp.com/www.careandshare-ut.org/wp-content/uploads/2020/09/image-coming-soon.jpg?fit=1200%2C1200&ssl=1' }}></img>
                <div className="imgsplitcont">
                    <img className="imgsplit" src={spot?.imageTwo} onError={(e) => { e.target.src = 'https://i0.wp.com/www.careandshare-ut.org/wp-content/uploads/2020/09/image-coming-soon.jpg?fit=1200%2C1200&ssl=1' }}></img>
                    <img className="imgsplit" src={spot?.imageThree} onError={(e) => { e.target.src = 'https://i0.wp.com/www.careandshare-ut.org/wp-content/uploads/2020/09/image-coming-soon.jpg?fit=1200%2C1200&ssl=1' }}></img>
                </div>
            </div>
            <div className="hostedcont">
                <div className="ownername">Entire home hosted by {spot?.Owner?.firstName}</div>
                <div className="spotprice">{spot?.price}$ <span className="pernight">night</span></div>
            </div>
            <div className="boxcont">

                <div className="ownerstatscont">
                    <div className="ownerstats">
                        <div className="owneraward">
                            <div> <i class="fa-solid fa-medal"></i> </div>
                            <div className="words">
                                <div>{spot?.Owner?.firstName} is a Superhost</div>
                                <div className="deta">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                            </div>
                        </div>
                        <div className="owneraward">
                            <div><i class="fa-solid fa-door-open"></i></div>
                            <div className="words">
                                <div>Self check-in</div>
                                <div className="deta">Check yourself in with the lockbox.</div>
                            </div>
                        </div>
                        <div className="owneraward">
                            <div><i class="fa-regular fa-calendar"></i></div>
                            <div className="words elo">Free cancellation for 48 hours.</div>
                        </div>
                    </div>
                    <div className="acover">
                        <div className="airc">air<span className="blackcover">cover</span></div>
                        <div className="aircover">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                    </div>
                    <div className="spotdes">
                        <div>{spot?.description}</div>
                    </div>
                </div>
                <div className="bookingcont">


                    <div className="booknight">
                        <div> <span className="booknightprice">$ {spot?.price}</span>  night</div>
                        <div className="bnstars">
                            <div>{spot?.avgRating} &#9733;</div>
                            <div>&#8729; {reviewsArr.length} Reviews</div>
                        </div>
                    </div>
                    <div className="ciformcont">
                        <form>
                            <div className="checkincont">
                                <div className="checkwrap">
                                    <div className="checklabel">Check-in Date</div>
                                    <DatePicker className="checkinput" selected={startDate} onChange={(date = Date) => setStartDate(date)} />
                                </div>
                                <div className="checkwrap">
                                    <div className="checklabel">Checkout Date</div>
                                    <DatePicker className="checkinput" selected={endDate} onChange={(date = Date) => setEndDate(date)} />
                                </div>
                            </div>
                            <div className="rsvbtn">
                                <button className="reservebtn" onClick={newBook}>
                                    Reserve
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="charge">you wont be charged yet</div>
                    <div>Cleaning Fee $500</div>
                    <div>Service Fee $1,000</div>
                    <div className="chargetot">
                        Total before taxes ${spot?.price + 1500}
                    </div>
                </div>
            </div>
            <div>
                {reviwed &&
                    <button className="lrbtn" onClick={reviewer}>
                        Leave a Review?
                    </button>
                }
            </div>
            <div className="reviewscont">
                <h2>{reviewsArr.length} Reviews {spot?.avgRating} &#9733;</h2>
                {reviewsArr?.map(rev => (
                    <div>
                        <div className="reviewswrapper">
                            <div className="revimg">
                                <img src='https://cdn-icons-png.flaticon.com/128/149/149071.png' style={{ width: '40px', height: '40px', borderRadius: '25px' }} />
                                <div className="namestars">
                                    <div>{rev.User.firstName}</div>
                                    <div className="revsrs">{rev.stars} stars</div>
                                </div>
                            </div>
                            <div>{rev.review}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}


export default SpotDetail;
