import { Link } from "react-router-dom";
import "./spotCard.css";



function SpotCard({ spot }) {
    console.log('this is prop', spot)
    console.log('image url', spot.previewImage);
    return (
        <>
            <div className="imageCard">
                <p>
                    <img src={spot?.previewImage} width="300" height="200" border-radius="25px"></img>
                </p>
                <div className="location">
                    <span className="loc" >{spot.city}, {spot.state} </span>      <span className="stars">{spot.avgRating}</span>
                </div>
                <div className="namelink">
                    <Link className="nameLink" key={spot.id} to={`/spots/${spot.id}`}>
                        {spot.name}
                    </Link>
                </div>
                <p>
                    {spot.price}$ <span className="night">night</span>
                </p>
            </div>
        </>

    )
}


export default SpotCard;
