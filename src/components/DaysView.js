import React, {useEffect, useState} from 'react';
import DayView from './DayView';

export default function DaysView(props) {
    const [data, setData] = useState({});

    const APPID = '16825ab0d00b0ca1ca42ab10921676b0';//ключ досступа к API
    const cityID = '501175';//ID города РнД

    //Для бесплатного исользования openweathermap.org API может предложить только вариант получения прогноза на ближайшие 5 дней с интервалом 3 часа, поэтому применим следующее
    //Перед отправкой запроса необходимо рассчитать сколько временных промежутков по 3 часа помещается в текущий день, т.к. API возращает промежутки начиная с текущего момента
    const currentDayCnt = Math.ceil((24 - new Date().getHours()) / 3);

    const setDayView = () => {
        const days = [];
        for (let i = 0; i < 3; i++) {
            const day = {};//Объект, который будет хранить данные о дне
            day.temp = Math.round(data.list.slice(currentDayCnt + 8 * i, currentDayCnt + (8 * (i + 1))).reduce((acc, item, index) => {
                if (index === 0) day.date = item.dt * 1000;//Запись даты в милисекундах
                if (index === 3) {
                    day.icon = item.weather[0].icon;
                    day.description = item.weather[0].description.toUpperCase().slice(0, 1) + item.weather[0].description.slice(1);
                }
                return item.main.temp + acc
            }, 0) / 8);//Подсчёт средней температуры, где 8 - число промежутков. Так же происходит отбрасывание промежутков текущего дня
            days.push(day);
        }

        return <div className="d-flex justify-content-center">{days.map((item, index) => <DayView day={item}
                                                                                                  key={index}/>)}</div>;
    }

    //Делаем запрос к API в размере 24 промежутка (т.к. 24 это 3 дня по 8 промежутков, где каждый промежуток равен 3 часам) и прибавляем остаток промежутков текущего дня
    useEffect(() => {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&cnt=${24 + currentDayCnt}&APPID=${APPID}&units=metric&lang=ru`)
                .then(res => res.json())
                .then(setData)

        }
        , []);
    return (
        <div>{data.list ? setDayView() : <p>Идёт загрузка данных...</p>}</div>
    );
};