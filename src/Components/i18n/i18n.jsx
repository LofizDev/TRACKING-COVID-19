import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
const resources = {
  vn: {
    translation: {
      "SỐLIỆU":"SỐ LIỆU",
      "LCQG": 'Lựa chọn quốc gia',
      "SCM": "Số ca nhiễm",
      "SCK": "Số ca khỏi",
      "TV": "Tử vong",
      "TONG": "Tổng ca nhiễm",
      "TC":"Tất cả",
      "30":"30 ngày",
      "7":"7 ngày",
      "CQG": "Các Quốc Gia",
      "TG":"Thế Giới",
      "HN":"Hôm nay",
      "HP":"Hồi phục"
    }
  },
  en: {
    translation: {
        "SỐLIỆU":"TRACKER",
        "LCQG": "Country selection",
        "SCM": "Cases",
        "SCK": "Recovered",
        "TV": "Deaths",
        "TONG":'All Cases',
        "TC":"All",
        "30":"30 days",
        "7":"7 days",
        "CQG": "All Countries",
        "TG":"World Wide",
        "HN":"Today",
        "HP":"Recovered"
    }
  },
  china: {
    translation: {
        "SỐLIỆU":"數據",
        "LCQG": "國家選擇",
        "SCM": "案件編號",
        "SCK": "案件編號",
        "TV":"死的",
        "TONG":"總感染",
        "TC":"全部",
        "30":"30 日",
        "7":"7 日",
        "CQG": "民族",
        "TG":"世界",
        "HN":"今天",
        "HP":"案件編號"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vn", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
