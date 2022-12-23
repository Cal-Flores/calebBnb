import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import SpotCard from "../spotCard";
import './searchResult.css'

function SearchedResult() {
    const searchObj = useSelector(state => state.search)
    const searchArr = Object.values(searchObj)
    console.log('this is searchobj', searchArr)

    let res = true;
    if (searchArr?.length === 0) {
        res = false
    }
    return (
        <div className='srcont'>
            <div className='srheader'>{searchArr?.length} Spots in the area:</div>
            <div className='srcont'>
                {!res &&
                    <div className='nsrcont'>
                        <div className='nsrlogo'><i class="fa-brands fa-airbnb"></i></div>
                        <div className='nsrtext'>Be the first to host a spot in the area!</div>
                    </div>
                }
                {searchArr?.map(spot => (
                    <div >
                        <div>
                            <Link className="spotcard" key={spot.id} to={`/spots/${spot.id}`}>
                                <div>
                                    <img className="spotimg" src={spot?.image} onError={(e) => { e.target.src = 'https://i0.wp.com/www.careandshare-ut.org/wp-content/uploads/2020/09/image-coming-soon.jpg?fit=1200%2C1200&ssl=1' }}></img>
                                </div>
                                <div className='srdetail'>
                                    <div className='srdet'>
                                        <div> {spot.city}, {spot.state}</div>
                                        {/* <div className="spotrate"> &#9733; {spot.avgRating}</div> */}
                                    </div>
                                    <div className='srdet'>
                                        {spot.name}
                                    </div>
                                    <div className='srdet'>
                                        <span>${spot.price} </span><span className="night">night</span>
                                    </div>
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
