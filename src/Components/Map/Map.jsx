import React,{ useState,useEffect } from 'react'
import './Map.scss'
import { sortData } from './Util'
import {useTranslation} from 'react-i18next'
function Map() {

    const {t} = useTranslation()
    const [map,setMap] = useState([])
    const [dataAll,setDataAll] = useState([])

    // Get Data all country
     useEffect(() => {
        const getDataByCountry = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
            .then((res) => res.json())
            .then((data) => {
                const map = data.map((map) => ({
                    flag: map.countryInfo.flag,
                    name: map.country,
                    cases: map.cases
                }))
                const sortedData = sortData(map)
                setMap(sortedData)
            })
        }
        getDataByCountry()
     },)
    //  Get Data worldwide
    useEffect(() => {
        const getDataWorldwide = async () => {
            await fetch("https://disease.sh/v3/covid-19/all")
            .then(res => res.json())
            .then(data => {
                setDataAll(data)
                console.log(dataAll)
            })
        }
        getDataWorldwide()
    },[])

    return (
        <div className='map'>
            <div className="map__wrapper">
                <div className="map__wrapper-right">
                    <h2>{t("CQG")}</h2>
                    <div className="map__wrapper-scroll">
                        {map.map((map) => (
                            <tr>
                                <td><img className='flag-country' width='37px' src={map.flag} alt="flagCountry" /></td>
                                <td >{map.name}</td>
                                <td><strong>{map.cases}</strong></td>
                            </tr>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Map
