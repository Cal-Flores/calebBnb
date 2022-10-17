import { Link } from "react-router-dom";



function SpotCard({ spot }) {
    console.log('this is prop', spot)
    return (
        <div>
            <Link key={spot.id} to={`/spots/${spot.id}`}>
                {spot.name}
            </Link>
            <div>
                adress: {spot.address}
                Location: {spot.city}, {spot.state} {spot.country}
                Stars: {spot.avgRating}
                Cost: {spot.price}
                description: {spot.description}
            </div>
        </div>

    )
}


export default SpotCard;
