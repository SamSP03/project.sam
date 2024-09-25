import { useEffect, useState } from 'react'
import './App.css'
import PropTypes from "prop-types";

/*images*/

import searchIcon from"./assets/search.png";
import clearIcon from"./assets/clear.gif";
import cloudIcon from"./assets/clouds.gif";
import humidityIcon from"./assets/humidity.gif";
import rainIcon from"./assets/rain.gif";
import snowIcon from"./assets/snowflake.gif";
import windIcon from"./assets/wind.gif";
import nightIcon from"./assets/nightcloud.gif";
import foggyIcon from"./assets/foggy.gif";
import stormIcon from"./assets/storm.gif";
import drizzleIcon from"./assets/drizzle.gif";
import cloudyIcon from"./assets/cloudy.gif";
import nightsIcon from"./assets/night.gif";

const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,wind,climate,des}) =>{
 return( 
 <>
   <div className="image">
   <img src={icon} alt="Image" /></div>
   <div className= "climate">{climate}</div>
   <div className="des">{des}</div>
   <div className="temp">{temp}°C</div>
   <div className="location">{city}</div>
   <div className= "country">{country}</div>
   <div className="cord">
    <div>
      <span className="lat">Lattitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className="log">Longitude</span>
      <span>{log}</span>
    </div>
   </div>
   <div className="data-container">
    <div className="element"> 
    <img src={humidityIcon}alt="Humidity" className="icon"/>
    <div className="data">
      <div className="humidity-percent">{humidity}</div>
      <div className="text">Humidity</div>
     </div>
     </div>
     <div className="element"> 
    <img src={windIcon}alt="wind" className="icon"/>
    <div className="data">
      <div className="wind percent">{wind}km/h</div>
      <div className="text">wind speed</div>
    
     </div>
    </div>
    </div>
 </>
 )
}
WeatherDetails.propTypes = {
  search:PropTypes.string.isRequired,
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  humidity:PropTypes.number.isRequired,
  wind:PropTypes.number.isRequired,
  lat:PropTypes.number.isRequired,
  log:PropTypes.number.isRequired,
};

function App() {
  let api_key="b1b4926f9fb32937e8205aa43fe94914";
  const [text,setText]=useState("vagamon")
  const [icon,setIcon]=useState(cloudIcon)
  const [temp,setTemp]=useState(0)
  const [city,setcity]=useState("vagamon")
  const [country,setcountry]=useState("IN")
  const[climate,setclimate]=useState("-")
  const[des,setdes]=useState("")
  const[lat,setlat]=useState(0)
  const[log,setlog]=useState(0)
  const[humidity,setHumidity]=useState(0)
  const[wind,setwind]=useState(0)
  const[CityNotFound,setCityNotFound]=useState(false);
  const[Loading,setLoading]=useState(false);
  const[error,setError]=useState(null);
  const weatherIconMap = {
    "01d":clearIcon,
    "01n":nightsIcon,
    "02d":cloudyIcon,
    "02n":cloudyIcon,
    "03d":cloudIcon,
    "03n":cloudIcon,
    "04n":nightIcon,
    "04d":cloudIcon,
    "09d":drizzleIcon,
    "09n":drizzleIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,
    "50d":foggyIcon,
    "50n":foggyIcon,
    "11d":stormIcon,
    "11n":stormIcon,
  };

  const search=async()=>{
    setLoading(true);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

  try {
    let res= await fetch(url);
    let data= await res.json();
    //console.log(data);    

    if(data.cod==="404"){
      console.error("city not found");
      setCityNotFound(true);
      setLoading(false);
      return;
    }
    setHumidity(data.main.humidity);
    setwind(data.wind.speed);
    setclimate(data.weather[0].main);
    setdes(data.weather[0].description)
    setTemp(Math.floor(data.main.temp));
    setcity(data.name);
    setcountry(data.sys.country);
    setlat(data.coord.lat);
    setlog(data.coord.lon);
    const weatherIconCode=data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode]||clearIcon);
    setCityNotFound(false);
  } catch (error) {
    console.error("An error occured:",error.message);
    setError("An error occured fetching weather data.");
  }finally{
   setLoading(false)

  }
  };


  const handlecity=(e)=>{
     setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if(e.key ==="Enter")
    {
      search();
    }
  };
  useEffect(function()
  {
    search();
  } ,[]);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="cityInput" placeholder="Search city" onChange={handlecity} value={text} onKeyDown={handleKeyDown}/>
             <div className="search-icon" onClick={()=>search()}>
              <img src={searchIcon} alt="search"/>
             </div>
             </div>
           
{Loading&&<div className="loading-message">Loading...</div>}
{error&&<div className="error-message">{error}</div>}
{CityNotFound&&<div className="city-not-found">City not found</div>}

{!Loading && !CityNotFound && <WeatherDetails icon={icon} temp={temp}   city={city} country={country}  lat={lat} log={log} humidity={humidity} wind={wind} climate={climate} des={des} />}
        <p className="copyright">Designed by <span>SAM S</span></p>
      </div>
    </>
  )
}

export default App;
