import { Link } from "react-router-dom";
import "./spotCard.css";



function SpotCard({ spot }) {
    //console.log('this is prop', spot)
    //if (!spot.previewImage) return null
    //console.log('image url', spot.previewImage);
    return (
        <>
            <div className="imageCard">
                <p>
                    <img className="img" src={spot?.previewImage} width="300" height="200" border-radius="25%"></img>
                </p>
                <div className="locstars">
                    <p className="location">
                        {spot.city}, {spot.state}                <span>{spot.avgRating}</span> &#9733;
                    </p>
                </div>
                <p className="namelink">
                    <Link className="nameLink" key={spot.id} to={`/spots/${spot.id}`}>
                        {spot.name}
                    </Link>
                </p>
                <p>
                    {spot.price}$ <span className="night">night</span>
                </p>
            </div>
        </>

    )
}


export default SpotCard;
