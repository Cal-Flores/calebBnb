import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { SearchResult } from '../../store/search'
import SpotCard from '../spotCard'
function SearchForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [reqstate, setReqState] = useState('')
    const states = ["Alabama", "Alaska", "Arizona", " Arkansas", " California", "Colorado", "Connecticut", " Delaware", "Florida", " Georgia", " Hawaii", " Idaho", "Illinois", " Indiana", "Iowa", "Kansas", " Kentucky", "Louisiana", "Maine", "Maryland", " Massachusetts", "Michigan", " Minnesota", " Mississippi", " Missouri", " Montana", "Nebraska", " Nevada", "New Hampshire", " New Jersey", "New Mexico", " New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", " Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", " Tennessee", "Texas", "Utah", "Vermont", " Virginia", " Washington", "West Virginia", "Wisconsin", "Wyoming"]

    const searchObj = useSelector(state => state.search)
    const searchArr = Object.values(searchObj)
    console.log('this is searchobj', searchArr)
    const searcher = (e) => {
        e.preventDefault()
        console.log('this my payload in component', reqstate)
        dispatch(SearchResult(reqstate))
        history.push('/search-results')
    }
    return (
        <div>
            <form
                onSubmit={searcher}
            >
                <label>
                    <select selected='State'
                        className="csstateinput"
                        value={reqstate}
                        onChange={(e) => setReqState(e.target.value)}>
                        {states.map(sta => (
                            <option className="stateinput">{sta}</option>
                        ))}
                    </select>
                </label>
                <button type='submit'>Search</button>
            </form>
            {/* {searchArr.map(spot => (
                <SpotCard spot={spot} />
            ))} */}
        </div>
    )

}


export default SearchForm;
