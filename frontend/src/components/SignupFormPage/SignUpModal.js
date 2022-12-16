import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './index';
import './SignupForm.css';

function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='signupbtn' onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupFormPage />
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;
