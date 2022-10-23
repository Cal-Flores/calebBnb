// copied from frontend/src/components/LoginFormModal/index.js

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotForm from './CreateSpot';



function CreateSpotFormModal() {
    const [showModal, setShowModal] = useState(false);

    const hideModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div className='becomeahost' onClick={() => setShowModal(true)}>Become a Host</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <CreateSpotForm hideModal={hideModal} />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default CreateSpotFormModal;
