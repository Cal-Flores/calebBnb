// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div className="dropdown">
                <button className="userNav" onClick={openMenu}>
                    <i class="fa-solid fa-user"></i>
                </button>
            </div>
            {
                showMenu && (
                    <>
                        <ul className="profile-dropdown">
                            <div className="textdiv">
                                <li>{user.username}</li>
                                <li>{user.email}</li>
                                <div>
                                    <button className="logoutBtn" onClick={logout}>Log Out</button>
                                </div>
                            </div>
                        </ul>
                    </>
                )
            }
        </>
    );
}

export default ProfileButton;
