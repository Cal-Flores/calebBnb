import { Link } from "react-router-dom";
import "./spotCard.css";



function SpotCard({ spot }) {
    //console.log('this is prop', spot)
    //if (!spot.previewImage) return null
    //console.log('image url', spot.previewImage);
    return (
        <div className="splashcont">
            <div className="splashwrapper">
                <Link className="spotcard" key={spot.id} to={`/spots/${spot.id}`}>
                    <div>
                        <img className="spotimg" src={spot?.image} onError={(e) => { e.target.src = 'https://i0.wp.com/www.careandshare-ut.org/wp-content/uploads/2020/09/image-coming-soon.jpg?fit=1200%2C1200&ssl=1' }}></img>
                    </div>
                    <div className="infowrapper">
                        <div className="spotloc"> {spot.city}, {spot.state}</div>
                        <div className="spotrate"> &#9733; {spot.avgRating}</div>
                    </div>
                    <div className="spotname">
                        {spot.name}
                    </div>
                    <div className="price">
                        <span className="spotprice">${spot.price} </span><span className="night">night</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
// <>
//     <div className="imageCard">
//         <p>
//<img src={spot?.previewImage} onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/128/149/149071.png' }} style={{ width: "300px", height: "200px", bordeRadius: "25px" }} />
//             <img className="img" src={spot?.previewImage} width="300" height="200" border-radius="25%"></img>
//         </p>
//         <div className="locstars">
//             <p className="location">
//                 {spot.city}, {spot.state}                <span>{spot.avgRating}</span> &#9733;
//             </p>
//         </div>
//         <p className="namelink">
//             <Link className="nameLink" key={spot.id} to={`/spots/${spot.id}`}>
//                 {spot.name}
//             </Link>
//         </p>
//         <p>
//             {spot.price}$ <span className="night">night</span>
//         </p>
//     </div>
// </>


export default SpotCard;
