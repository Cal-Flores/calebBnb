// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import CreateSpotFormModal from '../CreateSpot';
import SignUpFormModal from '../SignupFormPage/SignUpModal';
import { SearchResult } from '../../store/search';
import SpotDetail from '../spotDetail';
import SpotCard from '../spotCard';
import SearchForm from '../SearchForm/searchForm';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    // const searchObj = useSelector(state => state.search)
    // const searchArr = Object.values(searchObj)
    // console.log('this is searchobj', searchArr)
    const dispatch = useDispatch()
    const history = useHistory()



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
                <SearchForm className="calebbnb" />
            </div>
            <div className='seslinks'>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
