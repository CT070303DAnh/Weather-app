import{DateTime} from 'luxon'
const API_KEY = '526e4af081a559b6384180b0a72d2c85';
const BASE_URL="https://api.openweathermap.org/data/2.5"



const formatToLocalTime = (secs,zone,format="cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime
.fromSeconds(0.01).setZone(zone).toFormat(format);

const getWeatherData = (infoType, searchParams) => {

    const url = new URL(BASE_URL + "/" + infoType);
    url.search= new URLSearchParams({...searchParams, appid : API_KEY});
    
    return fetch(url).then((res) => res.json());
};
    const formatCurrentWeather = (data) => {
        const{
            coord: {lon, lat},
            main: {temp, feels_like, temp_min, temp_max, humidity},
            name,
            dt,
            sys: { country, sunrise, sunset},
            weather,
            wind: {speed}
        }=data
        const{main:details, icon}=weather[0]
        return {
            lon, lat, temp, feels_like, temp_min, 
            temp_max, humidity, name, dt, country,
             sunrise, sunset, details, icon, speed
    }}
    const formatForecastWeather = (data) => {
        let {timezone, list, hourly} = data;
        list = list.slice(1, 6).map((d)=>{
            return{
                title:formatToLocalTime(d.dt, timezone, 'ccc'),
                temp:d.main.temp,
                icon:d.weather[0].icon
            }
        })
        hourly = list.slice(1, 6).map((d)=>{
            return{
                title:formatToLocalTime(d.dt, timezone, 'hh:mm a'),
                temp:d.main.temp,
                icon:d.weather[0].icon
            }
        })
        return {timezone, list, hourly}
    }
const getFormattedWeatherData = async( searchParams) => {

    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
    .then(formatCurrentWeather);

    const{lat, lon} = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('forecast', {
        lat,
         lon,
         
           units: searchParams.units
    }).then(formatForecastWeather)
    
    return {...formattedCurrentWeather,...formattedForecastWeather};
 
}
    const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`
export default getFormattedWeatherData
export{iconUrlFromCode,formatToLocalTime} ;
