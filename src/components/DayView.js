import React from 'react';

export default function DayView({day}) {
    const date = new Date(day.date);
    const weekday = index => {
        switch (index) {
            case 0:
                return 'Вс';
                break;
            case 1:
                return "Пн";
                break;
            case 2:
                return "Вт";
                break;
            case 3:
                return "Ср";
                break;
            case 4:
                return "Чт";
                break;
            case 5:
                return "Пт";
                break;
            case 6:
                return "Сб";
                break;
            default:
                return "Пн";
        }
    }
    return (
        <div className="card mb-3 shadow border-0 rounded-bottom" style={{width: '350px'}}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img style={{width: '8rem'}} className="card-img-top"
                         src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt=""/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title font-weight-bold">{day.temp > 0 ? '+' : ''}{day.temp}&deg;C
                            | {day.temp > 0 ? '+' : ''}{Math.round((day.temp * 9 / 5) + 32)}&deg;F</h5>
                        <p className="card-text text-primary">{date.getDate().toString().length < 2 ? '0' : '' + date.getDate()}.{((date.getMonth() + 1).toString().length < 2 ? '0' : '') + (date.getMonth() + 1)}.{date.getFullYear()}, {weekday(date.getDay())}</p>
                        <p className="card-text text-muted font-italic">{day.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};