import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function DeleteASpot() {
    const dispatch = useDispatch();
    const spotId = useParams();

    const submitter = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <h2>Delete this spot?</h2>
            <button onClick={submitter}>yes</button>
            <button>no</button>
        </>
    )
};

export default DeleteASpot;
