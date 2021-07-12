import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import './Chart.scss'
import {useTranslation} from 'react-i18next'
const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));
  return {
    chart: {
      height: 470,
      width:480,
      backgroundColor: 'var(--item)',
      borderRadius:20,
    },
    title: {
      text: "Tổng ca nhiễm",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#6A5EEB'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: 'right',
      },
    },

    series: [
      {
        name: 'Tổng Ca nhiễm',
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

export default function Chart({ data }) {
  const {t} = useTranslation()
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('all');
  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case 'all':
        customData = data;
        break;
      case '30':
        customData = data.slice(Math.max(data.length - 30, 1));
        break;
      case '7':
        customData = data.slice(Math.max(data.length - 7, 1));
        break;

      default:
        customData = data;
        break;
    }
    setOptions(generateOptions(customData));
  }, [data, reportType]);
 
  return (
    <>
    <div className="chart-detail">

    <HighchartsReact highcharts={Highcharts} options={options} />

        <button
          className={reportType === 'all' ? 'active' : ''}
          onClick={() => setReportType('all')}
        >
            {t("TC")}
        </button>
        <button
          className={reportType === '30' ? 'active' : ''}
          onClick={() => setReportType('30')}
        >
         {t("30")}
        </button>
        <button
          className={reportType === '7' ? 'active' : ''}
          onClick={() => setReportType('7')}
        >
          {t("7")}
        </button>
    </div>
    </>
  );
}