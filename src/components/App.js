import React from 'react';
import DaysView from './DaysView';

function App() {
    return (
        <div className="app">
            <h2 className="text-center">Погода в Ростове-на-Дону на 3 дня вперёд</h2>
            <DaysView/>
        </div>
    );
}

export default App;
