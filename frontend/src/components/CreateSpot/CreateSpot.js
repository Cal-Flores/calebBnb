import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { CreateNewSpot } from "../../store/spots";
import './index.css'


function CreateSpotForm({ hideModal }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    // const [lat, setLat] = useState(0)
    // const [lng, setLng] = useState(0)
    const [image, setImage] = useState('')
    const [imageTwo, setImageTwo] = useState('')
    const [imageThree, setImageThree] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])
    const [sub, setSub] = useState(false);
    const [succ, setSucc] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const states = ["Alabama", "Alaska", "Arizona", " Arkansas", " California", "Colorado", "Connecticut", " Delaware", "Florida", " Georgia", " Hawaii", " Idaho", "Illinois", " Indiana", "Iowa", "Kansas", " Kentucky", "Louisiana", "Maine", "Maryland", " Massachusetts", "Michigan", " Minnesota", " Mississippi", " Missouri", " Montana", "Nebraska", " Nevada", "New Hampshire", " New Jersey", "New Mexico", " New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", " Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", " Tennessee", "Texas", "Utah", "Vermont", " Virginia", " Washington", "West Virginia", "Wisconsin", "Wyoming"]


    useEffect(() => {
        let validateErrors = [];

        if (description?.length > 500) validateErrors.push('please include a Description under 500 characters')
        if (name.length > 25 || name.length < 2) validateErrors.push('name must be under 25 characters, over 2 characters')
        if (address.length > 25 || address.length < 2) validateErrors.push('Adress must be under 25 characters, over 2 characters')
        if (city.length > 25 || address.length < 2) validateErrors.push('City must be under 25 characters, over 2 characters')
        //if (state > 25) validateErrors.push('State must be under 25 characters')
        if (country.length > 25 || country.length < 2) validateErrors.push('Country must be under 25 characters, over 2 characters')
        if (!price) validateErrors.push('cost per night is required')
        if (price <= 0) validateErrors.push('price per night must be greater than 0')
        if (description.length < 10 || description.length > 500) validateErrors.push('Description must be between 10 and 500 characters')
        if (!image.includes(".jpg") && !image.includes(".png") && !image.includes(".jpeg") && !image.includes(".JPG") && !image.includes(".PNG") && !image.includes(".JPEG")) validateErrors.push('Invalid Image')
        //if (!image.includes(".JPG") && !image.includes(".PNG") && !image.includes(".JPEG")) validateErrors.push('Invalid Image!')


        setErrors(validateErrors);

    }, [name, address, city, state, country, price, image])

    const hello = useSelector((state) => state.spots)


    const submitter = (e) => {
        e.preventDefault();
        setSub(true)
        if (errors.length) return
        let spotDetail = { name, address, city, state, country, image, imageTwo, imageThree, price, description }
        //thunk time!!
        const newSpot = dispatch(CreateNewSpot(spotDetail))
        console.log('new spot', newSpot.id)
        setSucc(true);
        setSubmitted(true);
        hideModal();
        history.push('/');
    }


    return (
        <div className="spotformcont">
            <h1 className="spotheader">CalebBnB's New Home</h1>
            {succ && <div>Thank you, Your New Spot Is Successfully Created!</div>}
            <div className="cscont">
                <form
                    className="spotFrom"
                    onSubmit={submitter}>
                    <ul className="err">
                        {(
                            errors.map(error => (
                                <li key={error}>{error}</li>
                            ))
                        )}
                    </ul>
                    <label >

                        <input
                            className="csinput"
                            placeholder="Name"
                            type='text'
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label >

                        <input
                            className="csinput"
                            placeholder="Address"
                            type='text'
                            name="address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    <label >

                        <input
                            className="csinput"
                            placeholder="City"
                            type='text'
                            name="city"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        <select
                            selected='State'
                            className="csstateinput"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        >
                            {states.map(sta => (
                                <option className="stateinput">{sta}</option>
                            ))}

                        </select>
                    </label>
                    <label >

                        <input
                            className="csinput"
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
                            className="csinput"
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
                            className="csinput"
                            placeholder="Optional Image"
                            type='text'
                            name="image"
                            value={imageTwo}
                            onChange={(e) => setImageTwo(e.target.value)}
                        />
                    </label>
                    <label >

                        <input
                            className="csinput"
                            placeholder="Optional Image"
                            type='text'
                            name="image"
                            value={imageThree}
                            onChange={(e) => setImageThree(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            className="csinput"
                            placeholder=" Description"
                            type='textarea'
                            name="description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label >
                        <span className="pricecs">Price</span>
                        <input
                            className="csinput"
                            placeholder="Price"
                            type='number'
                            name="price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>

                    <button className="subBtn" type='submit'>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}


export default CreateSpotForm;
