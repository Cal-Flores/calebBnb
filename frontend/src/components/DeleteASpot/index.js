import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { DeleteSpot } from "../../store/spots";

function DeleteASpot() {
    const history = useHistory()
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const [deleted, setDeleted] = useState(false);

    const submitter = (e) => {
        e.preventDefault();
        dispatch(DeleteSpot(spotId));
        setDeleted(true);
    }

    const noSub = (e) => {
        e.preventDefault()
        history.push(`/spots/${spotId}`);
    }
    return (
        <>
            <h2>Delete this spot?</h2>
            <button onClick={submitter}>yes</button>
            <button onClick={noSub}>Go Back</button>
            {deleted &&
                <h3>Your Spot has successfully been Deleted!</h3>
            }
        </>
    )
};

export default DeleteASpot;
