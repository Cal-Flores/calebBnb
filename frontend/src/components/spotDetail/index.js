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
import { getSpotBookings, postNewBooking } from "../../store/bookings";
import CreateReviewModal from "../createReview/createReviewModal";
import EditSpotFormModal from "../EditASpot/createSpotModal";



function SpotDetail() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [complete, setComplete] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory()
    const spotObj = useSelector((state) => state.spots)
    const bookings = useSelector((state) => state.bookings)
    // const spotBookings = useSelector((state) => state)
    console.log('HERE HE BOOKINGS', bookings)

    const spotReviews = useSelector((state) => state.reviews)
    let reviewsArr = Object.values(spotReviews)
    let bookingsArr = Object.values(bookings)
    let { spotId } = useParams();
    const spot = spotObj[spotId];
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
    const [sub, setSub] = useState(false)
    const [errors, setErrors] = useState([])
    const currentDate = new Date()

    useEffect(() => {
        const validateError = [];
        if (startDate.getTime() > endDate.getTime()) validateError.push('start date must be before end date')
        if (startDate.getTime() < currentDate.getTime()) validateError.push('start date must be after today')
        setErrors(validateError)
    }, [startDate, endDate])


    useEffect(() => {
        dispatch(getOneSpot(spotId)).then(setIsLoaded(true))
        dispatch(getAllSpotReviews(spotId))
        dispatch(getSpotBookings(spotId))
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
        let err = []
        setErrors([])
        // startDate = startDate.toISOString().split('T')[0];
        // endDate = endDate.toISOString().split('T')[0];
        startDate = new Date(startDate).toUTCString();
        endDate = new Date(endDate).toUTCString()

        let userStartSplit = startDate.split(" ")
        let userStartDate = `${userStartSplit[1]}-${userStartSplit[2]}-${userStartSplit[3]}`
        let userEndSplit = endDate.split(" ")
        let userEndDate = `${userEndSplit[1]}-${userEndSplit[2]}-${userEndSplit[3]}`
        let userEndmili = new Date(userEndDate).getTime()
        let userStartmili = new Date(userStartDate).getTime()

        if (userStartmili === userEndmili) err.push('Start date and end date cannot be the same')
        for (let date of bookingsArr) {
            console.log("DATE", date)
            let bookStartDate = new Date(date.startDate).toUTCString()
            let bookEndDate = new Date(date.endDate).toUTCString()
            let splitBookStart = bookStartDate.split(' ')
            let splitBookEnd = bookEndDate.split(' ')
            let dateStringStart = `${splitBookStart[1]}-${splitBookStart[2]}-${splitBookStart[3]}`
            let dateStringEnd = `${splitBookEnd[1]}-${splitBookEnd[2]}-${splitBookEnd[3]}`
            let dateEndmili = new Date(dateStringEnd).getTime()
            let dateStartmili = new Date(dateStringStart).getTime()

            if (userStartmili <= dateEndmili && userStartmili >= dateStartmili) {
                err.push('Start date conflicts with an exisiting booking')
            }
            if (userEndmili <= dateEndmili && userEndmili >= dateStartmili) {
                err.push('End date conflicts with an exisiting booking')
            }
        }

        if (err.length > 0) {
            setErrors(err)
        } else {
            let payload = { startDate, endDate, spotId }
            await dispatch(postNewBooking(payload))
            setSub(true)
            history.push(`/my-profile`)
        }
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
                    {/* {spot?.Owner?.id === sessionUser?.id && <div> <EditSpotFormModal spot={spot} /></div>} */}
                    {spot?.Owner?.id === sessionUser?.id && <button className="deletespotbtn" onClick={deleterr}><i class="fa-regular fa-trash-can"></i></button>}
                </div>
            </div>
            <div className="imgdiv" >
                <img className="imgcontainer" src={spot?.image} onError={(e) => { e.target.src = 'https://i0.wp.com/www.careandshare-ut.org/wp-content/uploads/2020/09/image-coming-soon.jpg?fit=1200%2C1200&ssl=1' }}></img>
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
                        <div>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
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
                            {errors.length > 0 &&
                                errors.map(error => (
                                    <li className="bookerr" key={error}>{error}</li>
                                ))
                            }
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
                                <button className="reservebtn" onClick={newBook} disabled={!!errors.length}>
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
                    <CreateReviewModal />
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
                                    <div>{rev?.User?.firstName}</div>
                                    <div className="revsrs">{rev.stars} &#9733;</div>
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
