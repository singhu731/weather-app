import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import './node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [inputCity,setInputCity] = useState("")
  const [data,setData] = useState({});

  const getWeatherDetails = (cityName) => {
    if(!cityName) return;
    
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res)=>{
      console.log("response",res.data)
      setData(res.data)
    }).catch((err)=>{
      console.log("err",err)
    })
  }

  const handleChangeInput = (e) =>{
    console.log("value",e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () =>{
    getWeatherDetails(inputCity)
  }

  useEffect(()=>{
    getWeatherDetails("delhi")
  },[])

  return (
    <div className='col-md-12'>
      <div className='weatherBg'>
        <h1 className='heading'>My Weather App</h1>
        <div className='d-grid col-4 gap-3 mt-4'>
         <input type='text' className='form-control' onChange={handleChangeInput} />
         <button type='button' className='btn btn-success' onClick={handleSearch}>Search</button>
        </div>
      </div>

      
      <div className='col-md-12 text-center mt-4'>
        <div className='shadow rounded weatherResultBox'>
          <img className='weatherIcon' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYVanYaCxVR1K8SIM5C7YXyVtTH5O2VcsqTA&usqp=CAU' />
          <h5 className='weatherCity'>{data?.name}</h5>
          <h6 className='weatherTemp'>{((data?.main?.temp)-273.15).toFixed(2)}°C</h6>
        </div>
      </div>
    </div>
  );
}

export default App;
