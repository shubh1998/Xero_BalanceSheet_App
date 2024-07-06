import React from 'react';
import './assets/css/App.css';
import BalanceSheet from './components/BalanceSheet';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Balance Sheet</h1>
            </header>
            <BalanceSheet />
        </div>
    );
};

export default App;
