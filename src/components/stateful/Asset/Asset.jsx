import React, { Component } from 'react';
import xrp from './img/xrp.svg';
import ada from './img/ada.svg';
import btc from './img/btc.svg';
import bch from './img/bch.svg';
import eth from './img/eth.svg';
import ltc from './img/ltc.svg';
import xlm from './img/xlm.svg';
import './Asset.css';

class Asset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: props.symbol.toUpperCase(),
            pair: props.pair.toUpperCase()
        };
        this.currentAsset = this.state.symbol.toLowerCase();
        this.uuidTradingSymbol = `${this.currentAsset}${Math.floor(Math.random() * 1000000)}`;
        this.uuidPrice = `${this.currentAsset}${Math.floor(Math.random() * 1000000)}`;
        this.uuidDeltaNum = `${this.currentAsset}${Math.floor(Math.random() * 1000000)}`;
        this.uuidHigh = `${this.currentAsset}${Math.floor(Math.random() * 1000000)}`;
        this.uuidLow = `${this.currentAsset}${Math.floor(Math.random() * 1000000)}`;
        this.uuidVolume = `${this.currentAsset}${Math.floor(Math.random() * 1000000)}`;
        this.exchange = props.exchange;
    }
    
    handleFetchData(url) {    
        fetch(url)
            .then(res => res.ok ? res.json() : console.log(res.statusCode, res.statusText))
            .then(data => {
                const info = data.DISPLAY;
                const tradingSymbol = document.querySelector(`#${this.uuidTradingSymbol}`);
                const price = document.querySelector(`#${this.uuidPrice}`);
                const deltaNum = document.querySelector(`#${this.uuidDeltaNum}`);
                const high = document.querySelector(`#${this.uuidHigh}`);
                const low = document.querySelector(`#${this.uuidLow}`);
                const volume = document.querySelector(`#${this.uuidVolume}`);
                const styleDelta = () => {
                    if (info.CHANGEPCT24HOUR >= 0) {
                        deltaNum.style.setProperty('color', 'var(--green)');
                        return `+${info.CHANGEPCT24HOUR}`;
                    } else {
                        deltaNum.style.setProperty('color', 'var(--red)');
                        return info.CHANGEPCT24HOUR;
                    }
                };

                tradingSymbol.innerHTML = this.state.symbol;
                price.innerHTML = info.PRICE;
                deltaNum.innerHTML = `${styleDelta()}%`;
                high.innerHTML = `<span class="hLetter">H</span> ${info.HIGH24HOUR}`;
                low.innerHTML = `<span class="lLetter">L</span> ${info.LOW24HOUR}`;
                volume.innerHTML = `<p class="volTitle">24H Volume</p> 
                <p class="volAmount">${info.VOLUME24HOURTO}</p>`;
            })
            .catch(error => console.error(error))
    }
    
    handleInitialFetch() {
        const url = `https://min-api.cryptocompare.com/data/generateAvg?fsym=${this.state.symbol}&tsym=${this.state.pair}&e=${this.exchange}`;
        
        this.handleFetchData(url);            
        this.handleUpdateData(url);
    }
    
    handleUpdateData(url) {            
        setInterval(() => this.handleFetchData(url), 30000);
    }
    
    render() {
        const returnImgSrc = () => {
            switch (this.state.symbol.toLowerCase()) {
                case 'xrp':
                    return xrp;
                    break;
                case 'ada':
                    return ada;
                    break;
                case 'bch':
                    return bch;
                    break;
                case 'eth':
                    return eth;
                    break;
                case 'ltc':
                    return ltc;
                    break;
                case 'xlm':
                    return xlm;
                    break;
                default:
                    return btc;
            }
        };

        return (
            <div className="assetContainer"> 
                <div className="symbol">
                    <img src={returnImgSrc()} alt={`${this.state.symbol} icon`} />
                </div>
                
                <div className="spotPricing">
                    <div id={this.uuidTradingSymbol} className="tradingSymbol"></div> 
                    <div id={this.uuidPrice} className="price"></div>
                </div>

                <ul className="priceDelta">
                    <li id={this.uuidDeltaNum} className="deltaNum"></li>
                    <li>24H</li>
                </ul>

                <div className="range">
                    <div id={this.uuidHigh} className="high"></div>
                    <div id={this.uuidLow} className="low"></div>
                </div>
                
                <div id={this.uuidVolume} className="volume"></div>
            </div>
        );
    }
    
    componentDidMount() {
        this.handleInitialFetch();
    }
}

export default Asset;