import React, { useState, useEffect } from "react";
import "./weather.css";
import axios from "axios";
import Input from "../Input/input";

const Weather = () => {
  const [data, setData] = useState({
    kota: "",
    temperature: "",
    temp_max: "",
    temp_min: "",
    wind: "",
    description: "",
    icon_id: "",
  });

  const [loading, setLoading] = useState(true);

  const submit = (value, e) => {
    setLoading(true);
    const kota = value.city;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=bde80c8749fea2d9c620431cbeb8a9da
    `
      )
      .then((response) => {
        setData({
          kota: response.data.name,
          icon_id: response.data.weather[0].id,
          temperature: Math.floor(response.data.main.temp - 275.15),
          wind: response.data.wind.speed,
          temp_max: Math.floor(response.data.main.temp_max - 275.15),
          temp_min: Math.floor(response.data.main.temp_min - 275.15),
          description: response.data.weather[0].main,
        });
        console.log(response.data);
        setLoading(false);
      });
    e.target.reset();
  };

  const [current, setCurrent] = useState({
    kota: "",
    temperature: "",
    temp_max: "",
    temp_min: "",
    wind: "",
    description: "",
    icon_id: "",
  });

  const submiti = () => {
    navigator.geolocation.getCurrentPosition((location) => {
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bde80c8749fea2d9c620431cbeb8a9da`
        )
        .then((response) => {
          setCurrent({
            kota: response.data.name,
            icon_id: response.data.weather[0].id,
            temperature: Math.floor(response.data.main.temp - 275.15),
            temp_max: Math.floor(response.data.main.temp_max - 275.15),
            temp_min: Math.floor(response.data.main.temp_min - 275.15),
            wind: response.data.wind.speed,
            description: response.data.weather[0].main,
          });
          console.log(response.data);
        });
    });
  };

  const icons = () => {
    const id = current.icon_id;
    console.log(id);
    if (id >= 200 && id <= 232) {
      return "wi-day-thunderstorm";
    } else if (id >= 300 && id <= 321) {
      return "wi-day-sleet";
    } else if (id >= 500 && id <= 531) {
      return "wi-day-snow-thunderstorm";
    } else if (id >= 600 && id <= 622) {
      return "wi-day-snow";
    } else if (id >= 701 && id <= 781) {
      return "wi-day-fog";
    } else if (id === 800) {
      return "wi-day-sunny";
    } else if (id >= 801 && id <= 804) {
      return "wi-day-cloudy";
    }
  };

  const icons2 = () => {
    const id = data.icon_id;
    console.log(id);
    if (id >= 200 && id <= 232) {
      return "wi-day-thunderstorm";
    } else if (id >= 300 && id <= 321) {
      return "wi-day-sleet";
    } else if (id >= 500 && id <= 531) {
      return "wi-day-snow-thunderstorm";
    } else if (id >= 600 && id <= 622) {
      return "wi-day-snow";
    } else if (id >= 701 && id <= 781) {
      return "wi-day-fog";
    } else if (id === 800) {
      return "wi-day-sunny";
    } else if (id >= 801 && id <= 804) {
      return "wi-day-cloudy";
    }
  };

  const muncul = (
    <div>
      <h3 className="description">{current.description}</h3>
      <i className={`wi ${icons()} display-4 icon`} />
      <br />

      <h1 className="city">in {current.kota}, </h1>

      <h2>{current.temperature}&deg;C</h2>
      <h4>
        min: {current.temp_min}&deg;C &nbsp; max: {current.temp_max}&deg;C
        &nbsp; wind: {current.wind}kn
      </h4>
    </div>
  );

  const tampil = !!loading ? null : (
    <div>
      <h1 className="deskripsi">{data.description}</h1>
      <br />
      <i className={`wi ${icons2()} display-1 icon2`} />
      <br />
      <br />
      <h1 className="kuto">in {data.kota},</h1>
      <h1 className="temp">{data.temperature}&deg;C</h1>
      <h3>
        min: {data.temp_min}&deg;C &nbsp; &nbsp; max: {data.temp_max}&deg;C
        &nbsp; &nbsp; wind: {data.wind}kn
      </h3>
      <br />
    </div>
  );

  useEffect(() => {
    submiti();
  }, []);

  return (
    <div>
      <h1 className="judul">WEATHER APP</h1>
      <div className="parent">
        <div className="div1">
          <div className="cont1">{muncul}</div>
        </div>
        <div className="div2">
          <div className="cont2">
            <Input onSubmit={submit} />
            {tampil}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
