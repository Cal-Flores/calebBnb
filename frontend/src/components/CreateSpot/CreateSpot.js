import { useState } from "react";
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { CreateNewSpot } from "../../store/spots";
import './index.css'


function CreateSpotForm() {
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
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    //const [] = useState()

    const submitter = (e) => {
        e.preventDefault();
        let spotDetail = { name, address, city, state, country, image, price, description }
        //thunk time!!
        dispatch(CreateNewSpot(spotDetail))
        history.push('/');

    }

    return (
        // <h1>Create A Spot</h1>
        <form onSubmit={submitter}>
            <label>
                Name
                <input
                    type='text'
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Address
                <input
                    type='text'
                    name="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            <label>
                City
                <input
                    type='text'
                    name="city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </label>
            <label>
                State
                <input
                    type='text'
                    name="state"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </label>
            <label>
                Country
                <input
                    type='text'
                    name="country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </label>
            {/* <label>
                Latitude
                <input
                    type='number'
                    name="latitude"
                    required
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
            </label>
            <label>
                Longitude
                <input
                    type='number'
                    name="longitude"
                    required
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
            </label> */}
            <label>
                Preview Image
                <input
                    type='text'
                    name="image"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </label>
            <label>
                Price
                <input
                    type='number'
                    name="price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            <label>
                Description
                <input
                    type='text'
                    name="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <button type='submit'>SUBMIT</button>
        </form>
    )
}


export default CreateSpotForm;
