import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { DeleteSpot, getAllSpots } from "../../store/spots";
import "./delete.css"

function DeleteASpot() {
    const [loaded, setLoaded] = useState(false);
    const history = useHistory()
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const [deleted, setDeleted] = useState(false);

    const submitter = (e) => {
        e.preventDefault();
        dispatch(DeleteSpot(spotId));
        history.push(`/`);
    }

    const noSub = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <div className="deletecontainer">

                <h2 className="htag">Delete this spot?</h2>
                <div>
                    <button className="yesbtn" onClick={submitter}>yes</button>
                    <button className="yesbtn" onClick={noSub}>Go Back</button>
                </div>
                {deleted &&
                    <h3 className="succtag">Your Spot has successfully been Deleted!</h3>
                }

            </div>
        </>
    )
};

export default DeleteASpot;
