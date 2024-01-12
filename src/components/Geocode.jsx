import '../App.css';
import { useState } from "react";

function Geocode() {
    const [query, setQuery] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [name, setName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');

    const handleChange = async (event) => {
        setQuery(event.target.value);
        if (event.target.value.length > 2) {
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${event.target.value}&limit=15`);
            const data = await response.json();
            setAddresses(data.features);
        } else {
            setAddresses([]);
        }
    };

    return (
        <div className="container">
            <div className="input-container">
                <input type="text" value={query} onChange={handleChange} />
                <ul style={query.length < 4 ? {display: 'none'} : {display: 'block'}}>
                    {addresses.map((address, index) => (
                        <li key={index} onClick={()=>{setQuery(''), setName(address.properties.name), setPostalCode(address.properties.postcode), setCity(address.properties.city)}}>{address.properties.label}</li>
                    ))}
                </ul>
                <input type="text" value={name} readOnly />
                <input type="text" value={postalCode} readOnly />
                <input type="text" value={city} readOnly />
            </div>
            <div className="map-container">
                {/* Votre carte Leaflet ici */}
            </div>
        </div>
    );

}

export default Geocode