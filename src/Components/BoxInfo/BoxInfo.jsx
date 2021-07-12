import React,{ useState,useEffect } from 'react'
import './style.scss'
import './BoxCase/BoxCase'
import BoxCase from './BoxCase/BoxCase'
import Chart from '../Chart/Chart'
import Map from '../Map/Map'
import icon from '../../Assets/images/icon.png'
import MapWorld from '../Map/MapWorld'
import { Moon, Sun} from '../Icons/Icons'
import {useTranslation} from 'react-i18next'
// import i18n from '../i18n/i18n'
function BoxInfo() {

    const {t,i18n} = useTranslation()
    const [locale,setLocale] = useState('vn')
    const [country,setCountry] = useState('VN')
    const [countries,setCountries] = useState([])
    const [countryInfo,setCountryInfo] = useState([])
    const [chartData,setChartData] = useState([])
    const [theme,setTheme] = useState('light')

    
    // Multi Language
    const handleChangeLocale = (lan) => {
        setLocale(lan)
        i18n.changeLanguage(lan)
    }

    //Call api VN when the app run the firt time ^^
    useEffect(() => {
        fetch("https://api.covid19api.com/dayone/country/VN")
          .then((response) => response.json())
          .then((data) => {
              setCountryInfo(data[data.length-1])
              setChartData(data)
          });
      }, []);


    //   Call api => get name and IOS2 countries ^^
    useEffect(() => {
        const getDataCountries = async () => {
            await fetch('https://api.covid19api.com/countries')
            .then((res) => res.json())
            .then((data) => {
                const countries = data.map((country) => ({
                    name: country.Country,
                    value: country.ISO2
                }))
                setCountries(countries)
            })
        }
        getDataCountries()
    },[])


    // Event change value when select option and call api^^
    const onChangeCountries = async (e) => {
        try{
        const countryCode = e.target.value
        const url = countryCode === "VN"
                ? `https://api.covid19api.com/dayone/country/VN`
                : `https://api.covid19api.com/dayone/country/${countryCode}`
     
        await fetch(url)

        // check if Confirmed from api error return null
        .then((res) => res.json())
        .then((data) => {
             if(data && data.length) {
             setCountry(countryCode)
             setCountryInfo(data[data.length-1])
             setChartData(data)
              }
            return []
        })
    }catch(err) {
        return countryInfo.length = []
    }
}

const checkTheme = () => {
    switch(theme) {
        case 'light':
        setTheme('dark')
        return document.documentElement.setAttribute('data-theme','dark')

        case 'dark':
        setTheme('light')
        return document.documentElement.setAttribute('data-theme','light')
   
        default: 
        setTheme('light')
        return document.documentElement.setAttribute('data-theme','light')
    }
}

    return (
        <>
        <div className="header">
        <h2 className='title'>{t("SỐLIỆU")} C<img width='28px' src={icon}/>VID 19</h2>
        <div className="btn-select">
                           <button style={{border:0}} onClick={checkTheme}>
                              {theme==='light' ? (
                                <Moon/>
                            ): (
                                <Sun/>
                            )}
                           </button>
                        <select className='language' value={locale} onChange={(e) => handleChangeLocale(e.target.value)}>
                           <option value="vn">VietNam</option>
                           <option value="en">English</option>
                           <option value="china">China</option>
                        </select>
        </div>
        </div>
        <div className="boxInfo">
            <div className="wrapper">
                <div className="wrapper-left"> 
                    <select className='select-ct' onChange={onChangeCountries} value={country} >
                       {countries.map((country) => (
                          <option value={country.value}>{country.name}</option>
                    ))}
                    </select>
                    <p>{t("LCQG")}</p>
                   <div className="boxCase__info">
                      <BoxCase title={t("SCM")}  todayCase={countryInfo.Confirmed} />
                      <BoxCase title={t("SCK")} todayCase={countryInfo.Recovered}/>
                      <BoxCase title={t("TV")} todayCase={countryInfo.Deaths}/>
                 </div>
                 <div className="chart-container" style={{display:'flex'}}>
                   <Chart data={chartData}/>
                   <Map/>
                 </div>
           
                </div>
                <div className="wrapper-right">
                      <MapWorld/>
                </div>
            </div>
                </div>
                </>
    )
}
export default BoxInfo
