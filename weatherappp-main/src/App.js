import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import CityComponent from "./components/CityComponent";
import CurrentLocation from "./components/CurrentLocation";
import Error from "./components/Error";
import WeatherInfo from "./components/WeatherInfo";

const API_KEY = "af85b8af001d4bbb0b7822a8105b197d";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [found, setFound] = useState(false);
  const [apierror, setApierror] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (CurrCity) => {
    if (CurrCity) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CurrCity}&appid=${API_KEY}`
        );
        setWeather(response.data);
        setFound(true);
        setApierror(false);
      } catch {
        setApierror(true);
        setFound(false);
      }
      setLoading(false);
    }
  };

  return (
    <Container>
      <AppLabel>Weather APPLICATION</AppLabel>
      {weather && found ? (
        <WeatherInfo
          weather={weather}
          setFound={setFound}
          BackClick={() => {
            setCity("");
          }}
        />
      ) : apierror && city.length > 0 ? (
        <Error
          setApierror={setApierror}
          BackClick={() => {
            setCity("");
          }}
        />
      ) : (
        <>
          <CityComponent
            setCity={(e) => {
              setCity(e);
            }}
            city={city}
            fetchWeather={fetchWeather}
            weather={weather}
            loading={loading}
          />
          <div>or</div>
          <CurrentLocation
            setCity={setCity}
            setFound={setFound}
            fetchWeather={fetchWeather}
          />
        </>
      )}
    </Container>
  );
}
export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  box-shadow: 0 3px 6px 0 #555;
  padding: 40px 20px;
  border-radius: 4px;
  width: 380px;
  background-color: white;
  font-family: "DM Sans", sans-serif;

  > div {
    margin: auto;
    padding-bottom: 15px;
    font-weight: bold;
    font-size: 23px;
    color: gray;
  }
`;
const AppLabel = styled.span`
  color: rgb(65, 168, 241);
  font-size: 18px;
  font-weight: bold;
  margin-bottom: -22px;
`;
