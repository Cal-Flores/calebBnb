// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import CreateSpotFormModal from '../CreateSpot';
import SignUpFormModal from '../SignupFormPage/SignUpModal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const [reqstate, setReqState] = useState('')

    const states = ["Alabama", "Alaska", "Arizona", " Arkansas", " California", "Colorado", "Connecticut", " Delaware", "Florida", " Georgia", " Hawaii", " Idaho", "Illinois", " Indiana", "Iowa", "Kansas", " Kentucky", "Louisiana", "Maine", "Maryland", " Massachusetts", "Michigan", " Minnesota", " Mississippi", " Missouri", " Montana", "Nebraska", " Nevada", "New Hampshire", " New Jersey", "New Mexico", " New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", " Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", " Tennessee", "Texas", "Utah", "Vermont", " Virginia", " Washington", "West Virginia", "Wisconsin", "Wyoming"]
    const searcher = () => {

    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='dropdwn'>

                <button className='becomehost'>
                    <CreateSpotFormModal />
                </button>
                <div className='pb'>
                    <ProfileButton user={sessionUser} />
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignUpFormModal />
            </>
        );
    }

    return (
        <div className='navcont'>

            <NavLink className='navwrapper' exact to="/">
                <div className='logo'>
                    <i class="fa-brands fa-airbnb"></i>
                </div>
                <div className="calebbnb" >
                    <div>CalebBnB</div>
                </div>
            </NavLink>
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
            </div>

            <div className='seslinks'>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
