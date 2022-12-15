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

            <div className='seslinks'>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
