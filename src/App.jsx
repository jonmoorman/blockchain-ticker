import React, { Component } from 'react';
import './App.css';
import Asset from './components/stateful/Asset/Asset.jsx';

const Layout = props => {
    return(
        <React.Fragment>
            <Asset symbol="xrp" pair="usd" exchange="CCCAGG" />
            <Asset symbol="btc" pair="usd" exchange="CCCAGG" />
            <Asset symbol="bch" pair="usd" exchange="CCCAGG" />
            <Asset symbol="ltc" pair="usd" exchange="CCCAGG" />
            <Asset symbol="eth" pair="usd" exchange="CCCAGG" />
            <Asset symbol="ada" pair="usd" exchange="CCCAGG" />
            <Asset symbol="xlm" pair="usd" exchange="CCCAGG" />
        </React.Fragment>
    );
}

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Layout />
            </React.Fragment>
        );
    }
}

export default App;