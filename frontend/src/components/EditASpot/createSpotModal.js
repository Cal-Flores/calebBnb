// copied from frontend/src/components/LoginFormModal/index.js

import React, { useState } from 'react';
import EditSpotForm from '.';
import { Modal } from '../../context/Modal';



function EditSpotFormModal({ spot }) {
    const [showModal, setShowModal] = useState(false);

    const hideModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div onClick={() => setShowModal(true)}> <i class="fa-regular fa-pen-to-square"></i></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <EditSpotForm hideModal={hideModal} spotty={spot} />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default EditSpotFormModal;
