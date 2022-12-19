import EditBooking from "../EditA Booking";
import { Modal } from '../../context/Modal';
import { useEffect, useState } from "react";

function EditBookingFormModal({ book }) {
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
                        <EditBooking book={book} hideModal={hideModal} />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default EditBookingFormModal;
