import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import Infobox from "./components/Infobox";
import Map from "./components/Map";
import Table from "./components/Table";
import { sortData } from "./components/utility";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setcountries] = useState([]); //LIST/NAMES  OF COUNTRY AND IsO2 i.e. country code
  const [country, setCountry] = useState("worldwide"); //cOUNTRY CODE, it is used to display the name of the selected country on the dropdown menu
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]); //It contains all the parsedData
  const [casesType, setCasesType] = useState("cases");
  
  //  *********************************************************************************

  // This useEffect adds the country data to the drop down menu
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setcountries(countries);
         
        
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  // this useEffect sets the initial data in the info boxes w.r.t the worldwide data AND IT LOADS ONLY ONCE
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  // ***********************************************************************************
  //  On change of country the onChnage button triggers this function and performs this task

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
       
        setCountry(countryCode);
        setCountryInfo(data);
       
       
        
      });
  };

  // const casesType = "cases";

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>C😷VID ①⑨ </h1>

          <FormControl className="app__dropdown">
            <Select
              value={country}
              // variant="outlined"
              onChange={ onCountryChange}
              className="dropdown__items"
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((item) => (
                <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Infobox
            title="COVID Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <Infobox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <Infobox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <div className="app__graph">
        <Card>
          <CardContent>
          <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
        </div>
       
           
        {/* <Map center={mapCenter} zoom={mapZoom} countries={mapCountries}/> */}
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Cases by countries</h3>
            <Table countries={tableData} />
            {/* <h3>New Cases</h3> */}
            {/* <LineGraph casesType={casesType} /> */}
          </CardContent>
        </Card>
        {/* Table */}
        {/* Graph */}
      </div>

     
    </div>
  );
}

export default App;

// https://disease.sh/v3/covid-19/countries
