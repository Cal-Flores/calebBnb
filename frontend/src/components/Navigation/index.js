// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import CreateSpotFormModal from '../CreateSpot';
import SignUpFormModal from '../SignupFormPage/SignUpModal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='dropdwn'>
                <ProfileButton user={sessionUser} />
                <CreateSpotFormModal />
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
        <ul>
            <li>
                <i class="fa-solid fa-city"></i>
                <NavLink className="calebbnb" exact to="/">CalebBnB</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;
