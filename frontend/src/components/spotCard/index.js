import { Link } from "react-router-dom";



function SpotCard({ spot }) {
    //console.log('this is prop', spot)
    console.log('image url', spot.previewImage);
    return (
        <div>
            <Link key={spot.id} to={`/spots/${spot.id}`}>
                {spot.name}
            </Link>
            <div>{spot.address}</div>
            <div>{spot.avgRating} Stars</div>
            <div>{spot.price}$</div>
            <div>{spot.city}</div>
            <div>{spot.state}</div>
            <div>{spot.description}</div>
            <div>{spot.previewImage}</div>
            <img src={spot.previewImage} width="100" height="100"></img>
        </div>

    )
}


export default SpotCard;
