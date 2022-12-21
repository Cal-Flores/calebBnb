import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import SpotCard from "../spotCard";

function SearchedResult() {
    const searchObj = useSelector(state => state.search)
    const searchArr = Object.values(searchObj)
    console.log('this is searchobj', searchArr)

    return (
        <div>
            <div>Hello to you stranger</div>
            <div>
                {searchArr?.map(spot => (
                    <div className="splashcont">
                        <div className="splashwrapper">
                            <Link className="spotcard" key={spot.id} to={`/spots/${spot.id}`}>
                                <div>
                                    <img className="spotimg" src={spot?.image} onError={(e) => { e.target.src = 'https://i0.wp.com/www.careandshare-ut.org/wp-content/uploads/2020/09/image-coming-soon.jpg?fit=1200%2C1200&ssl=1' }}></img>
                                </div>
                                <div className="infowrapper">
                                    <div className="spotloc"> {spot.city}, {spot.state}</div>
                                    {/* <div className="spotrate"> &#9733; {spot.avgRating}</div> */}
                                </div>
                                <div className="spotname">
                                    {spot.name}
                                </div>
                                <div className="price">
                                    <span className="spotprice">${spot.price} </span><span className="night">night</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
export default SearchedResult;
