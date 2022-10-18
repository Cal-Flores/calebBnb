import { useState } from "react";


function CreateSpotForm() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    //const [] = useState()

    return (
        // <h1>Create A Spot</h1>
        <form >
            <label>
                Name
                <input
                    type='text'
                    name="name"
                    required
                />
            </label>
            <label>
                Address
                <input
                    type='text'
                    name="address"
                    required
                />
            </label>
            <label>
                City
                <input
                    type='text'
                    name="city"
                    required
                />
            </label>
            <label>
                State
                <input
                    type='text'
                    name="state"
                    required
                />
            </label>
            <label>
                Country
                <input
                    type='text'
                    name="country"
                    required
                />
            </label>
            <label>
                Latitude
                <input
                    type='number'
                    name="latitude"
                    required
                />
            </label>
            <label>
                Longitude
                <input
                    type='number'
                    name="longitude"
                    required
                />
            </label>
            <label>
                Preview Image
                <input
                    type='text'
                    name="image"
                    required
                />
            </label>
            <label>
                Price
                <input
                    type='number'
                    name="price"
                    required
                />
            </label>
            <label>
                Description
                <input
                    type='text'
                    name="description"
                    required
                />
            </label>
        </form>
    )
}


export default CreateSpotForm;
