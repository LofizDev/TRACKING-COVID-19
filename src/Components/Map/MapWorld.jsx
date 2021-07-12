import Corona from '../../Assets/images/vaccine.png'
import TodayCase from '../../Assets/images/soap.png'
import gel from '../../Assets/images/test.png'
import doctor from '../../Assets/images/doctor.webp'
import death  from '../../Assets/images/death.png'
import React, { useState,useEffect } from 'react'
import {useTranslation} from 'react-i18next'

function MapWorld() {

    const [dataAll,setDataAll] = useState([])
    const {t} = useTranslation()
    // Get Data worldwide
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
         <div className="map__wrapper-left sidebar">
            <h2>{t("TG")}</h2>
            <div className="map-content"> 
            <div className="map-item">
              <img src={Corona}  alt='icon'/><p>{t("SỐLIỆU")}:{dataAll.cases}</p>
            </div>
            <div className="map-item">
               <img src={TodayCase}  alt='icon'/>
               <p>{t("HN")}:{dataAll.todayCases}</p>
            </div>
            <div className="map-item">
            <img src={gel}  alt='icon'/>
               <p>{t("HP")}:{dataAll.recovered}</p>
            </div>
            <div className="map-item">
            <img src={death} width='320px' alt="doctor" />
                <p>{t("TV")}:{dataAll.deaths}</p>
            </div>
                {/* <img src={doctor} width='320px' alt="doctor" /> */}
             </div>
          </div> 
    )
}

export default MapWorld
