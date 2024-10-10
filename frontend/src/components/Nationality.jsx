import React, {useState, useEffect} from 'react';
import '../KycForm.css';

function Nationality() {
    let [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setCountries(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCountries();
    }, []);

    return (
    <div className="form-group">
            <label htmlFor="national-id">National ID / Government Issued ID</label>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching countries: error</p>}
            <select name="nationality" id="nationality" required>
                <option value="">Please Select</option>
                {countries.map(country => (<option key={country.cca2} value={country.name.common}>{country.name.common}</option>))}
            </select>
    </div>
    );
}

export default Nationality;