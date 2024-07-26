
import './App.css';
import { useEffect, useState } from 'react';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButton from './components/TopButton';
import Input from './components/Input';
import Forecast from './components/Forecast';
import TimeAndLocation from './components/TimeAndLocation';
import getWeatherData from './services/weatherService';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import getFormattedWeatherData from './services/weatherService';

function App() {

  const[query,setQuery]=useState({q:'berlin'})
  const[units,setUnit]=useState('metric')
  const[weather,setWeather]=useState(null)

   useEffect(()=>{
    const fetchWeather = async()=>{
       await getFormattedWeatherData({...query,...units}).then((data)=>{
        setWeather(data);
       });
      
    };
    fetchWeather();
  },[query,units]
   )
  //  const formatBackground = () => {
  //   if(!weather) return 'from-cyan-700 to-blue-700'
  //   const threshold = units === 'metric' ? 20 : 60
  //   if(weather.temp<= threshold) return 'from cyan-700 to blue-700'
  //   return 'from-yellow-700 to-orange-700'
  //  }

  const fetchWeather = async()=>{
    const data = await getFormattedWeatherData({q:"hanoi"});
    console.log(data);
  };
  fetchWeather();
  return (
    <div className="mx-auto max-w-screen-md mt-4 
    py-5 px-32 bg-gradient-to-br from-orange-700 via-cyan-700
     to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButton setQuery={setQuery}/>
      <Input setQuery={setQuery} units={units} setUnit={setUnit}/>

      {weather && (
        <div>
          <TimeAndLocation weather={weather}/>
          <TemperatureAndDetails weather={weather}/>
          <Forecast title="hourly forecast" items={weather.hourly}/>
          {/* <Forecast title="daily forecast" items={weather.daily}/>  */}
        </div>
      )}
     
    </div>
  );
}

export default App;
