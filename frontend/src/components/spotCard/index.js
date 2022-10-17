import { Link } from "react-router-dom";



function SpotCard({ spot }) {
    //console.log('this is prop', spot)
    return (
        <div>
            <Link key={spot.id} to={`/spots/${spot.id}`}>
                {spot.name}
            </Link>
            <div>{spot.address}</div>
            <div>{spot.price}</div>
            <div>{spot.city}</div>
            <div>{spot.state}</div>
            <div>{spot.description}</div>
        </div>

    )
}


export default SpotCard;
