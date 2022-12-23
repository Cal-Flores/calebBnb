import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditSpot, getAllSpots, getOneSpot, getUserSpots } from "../../store/spots";
import "./index.css"

function EditSpotForm({ hideModal, spotty }) {
    const spotId = spotty?.id;
    const dispatch = useDispatch()
    const [name, setName] = useState(spotty?.name)
    const [address, setAddress] = useState(spotty?.address)
    const [city, setCity] = useState(spotty?.city)
    const [state, setState] = useState(spotty?.state)
    const [country, setCountry] = useState(spotty?.country)
    const [image, setImage] = useState(spotty?.image)
    const [imageTwo, setImageTwo] = useState(spotty?.imageTwo)
    const [imageThree, setImageThree] = useState(spotty?.imageThree)
    const [price, setPrice] = useState(spotty?.price)
    const [description, setDescription] = useState(spotty?.description)
    const [error, setErrors] = useState([])


    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch, spotId])

    useEffect(() => {
        const validateError = [];

        if (description?.length > 500) validateError.push('please include a Description under 500 characters')
        if (name.length > 25 || name.length < 2) validateError.push('name must be under 25 characters, over 2 characters')
        if (address.length > 25 || address.length < 2) validateError.push('Adress must be under 25 characters, over 2 characters')
        if (city.length > 25 || address.length < 2) validateError.push('City must be under 25 characters, over 2 characters')
        //if (state > 25) validateErrors.push('State must be under 25 characters')
        if (country.length > 25 || country.length < 2) validateError.push('Country must be under 25 characters, over 2 characters')
        if (!price) validateError.push('cost per night is required')
        if (price <= 0) validateError.push('price per night must be greater than 0')
        if (description.length < 10 || description.length > 500) validateError.push('Description must be between 10 and 500 characters')
        if (!image.includes(".jpg") && !image.includes(".png") && !image.includes(".jpeg") && !image.includes(".JPG") && !image.includes(".PNG") && !image.includes(".JPEG")) validateError.push('Invalid Image')
        //if (!image.includes(".JPG") && !image.includes(".PNG") && !image.includes(".JPEG")) validateErrors.push('Invalid Image!')

        setErrors(validateError);


    }, [name, address, city, state, country, description, price])
    const states = ["Alabama", "Alaska", "Arizona", " Arkansas", " California", "Colorado", "Connecticut", " Delaware", "Florida", " Georgia", " Hawaii", " Idaho", "Illinois", " Indiana", "Iowa", "Kansas", " Kentucky", "Louisiana", "Maine", "Maryland", " Massachusetts", "Michigan", " Minnesota", " Mississippi", " Missouri", " Montana", "Nebraska", " Nevada", "New Hampshire", " New Jersey", "New Mexico", " New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", " Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", " Tennessee", "Texas", "Utah", "Vermont", " Virginia", " Washington", "West Virginia", "Wisconsin", "Wyoming"]

    const editSubmitter = (e) => {
        e.preventDefault();
        let editedSpot = { name, address, city, state, country, price, description, image, imageTwo, imageThree }
        const payload = { formInfo: editedSpot, spotId }
        dispatch(EditSpot(payload))
        hideModal()
    }



    return (
        <div className="escont">
            <div className="eswrapper">
                <div className="eslogo">
                    <i class="fa-brands fa-airbnb"></i>
                </div>
                <div className="esheader">Edit Your Home</div>
                <form
                    className="esseditForm"
                    onSubmit={editSubmitter}>
                    <ul className="er">
                        {error.length > 0 &&
                            error.map(err => (
                                <li key={err}>{err}</li>
                            ))
                        }
                    </ul>
                    <label>

                        <input
                            className="esinput"
                            placeholder="Name"
                            type='text'
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>

                        <input
                            className="esinput"
                            placeholder="Address"
                            type='text'
                            name="address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    <label>

                        <input
                            className="esinput"
                            placeholder="City"
                            type='text'
                            name="city"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        <select selected='State' className="esstateinput" value={state}
                            onChange={(e) => setState(e.target.value)}>
                            {states.map(sta => (
                                <option className="stateinput">{sta}</option>
                            ))}
                        </select>
                    </label>
                    <label>

                        <input
                            className="esinput"
                            placeholder="Country"
                            type='text'
                            name="country"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    <label >

                        <input
                            className="esinput"
                            placeholder="Preview Image"
                            type='text'
                            name="image"
                            required
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </label>
                    <label >

                        <input
                            className="esinput"
                            placeholder="Optional Image"
                            type='text'
                            name="image"
                            value={imageTwo}
                            onChange={(e) => setImageTwo(e.target.value)}
                        />
                    </label>
                    <label >

                        <input
                            className="esinput"
                            placeholder="Optional Image"
                            type='text'
                            name="image"
                            value={imageThree}
                            onChange={(e) => setImageThree(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            className="esinput"
                            placeholder="price"
                            type='number'
                            name="price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    <label>

                        <input
                            className="esinput"
                            placeholder="Description"
                            type='text'
                            name="description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <button className="essend" type='submit' disabled={!!error.length}>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}


export default EditSpotForm;
