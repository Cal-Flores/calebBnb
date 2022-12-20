import { Modal } from '../../context/Modal';
import { useEffect, useState } from "react";
import CreateReiew from '.';


function CreateReviewModal() {
    const [showModal, setShowModal] = useState(false);

    const hideModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button className='lrbtn' onClick={() => setShowModal(true)}>Leave a Review?</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <CreateReiew hideModal={hideModal} />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default CreateReviewModal;
