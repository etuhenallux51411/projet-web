import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useRef } from 'react';

function App({city}) {
    const API_KEY = 'cc76404f9895f031e91f5dcdda2490e8'; // Remplacez par votre clé d'API
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const inputRef = useRef(null);

    // État pour stocker la température
    const [temperature, setTemperature] = useState(null);
    const [error, setError] = useState(null);
    const [choixPays, setChoixPays] = useState(city);

    // Fonction pour récupérer les données météo
    async function getWeather(city, country) {
        setError(null);
        setTemperature(null);
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    q: `${city},${country}`,
                    appid: API_KEY,
                    units: 'metric', // Affiche les températures en Celsius
                },
            });

            // Met à jour l'état avec la température
            setTemperature(response.data.main.temp);
        } catch (err) {
            console.error('Erreur lors de la récupération des données météo:');
            setError('Impossible de récupérer les données météo.');
        }
    }

    // Appeler `getWeather` lorsque le composant est monté
    useEffect(() => {
        console.log(choixPays);
        getWeather(choixPays, 'BE');
    }, [choixPays,error]);

    return (
        <div className="App">

            <input type="text" ref={inputRef}/>
            <button onClick={() => setChoixPays(inputRef.current.value)}>Changer ville</button>
            <h1>Météo </h1>
            <h2>{choixPays}</h2>
            {error ? (
                <p style={{color: 'red'}}>{error}</p>
            ) : temperature !== null ? (
                <p>Température : {temperature} °C</p>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
}

export default App;
