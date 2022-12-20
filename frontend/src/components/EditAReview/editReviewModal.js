import { Modal } from '../../context/Modal';
import { useEffect, useState } from "react";
import Editreview from '.';



function EditReviewModal({ rev }) {
    const [showModal, setShowModal] = useState(false);

    const hideModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div onClick={() => setShowModal(true)}><i class="fa-regular fa-pen-to-square"></i></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <Editreview hideModal={hideModal} rev={rev} />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default EditReviewModal;
