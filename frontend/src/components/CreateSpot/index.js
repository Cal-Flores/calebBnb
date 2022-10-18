// copied from frontend/src/components/LoginFormModal/index.js

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotForm from './CreateSpot';



function CreateSpotFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>Add A Spot</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <CreateSpotForm />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default CreateSpotFormModal;
