import React from 'react';
import './App.scss';
import Block from './components/Block';
import Header from './components/Header';
import useFetch from './hooks/useFetch';
function App() {
  const [rates, setRates] = React.useState([]);
  const [fromCurrency, setFromCurrency] = React.useState('UAH');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);


  const { data, error } = useFetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
  

  React.useEffect(() => {
    if (!error && data) {
      setRates(data);
    }
  }, [data, error]);

  const getExchangeRate = () => {
    const fromCurrencyRate = getCurrencyRate(fromCurrency);
    const toCurrencyRate = getCurrencyRate(toCurrency);
    return fromCurrencyRate / toCurrencyRate;
  }


  const inputFromPrice = (value) => {
    setFromPrice(value);
    const exchangeRate = getExchangeRate();
    const result = exchangeRate * value;
    setToPrice(result.toFixed(2));
  }

  const inputToPrice = (value) => {
    setToPrice(value);
    const exchangeRate = getExchangeRate();
    const result = value / exchangeRate;
    setFromPrice(result.toFixed(2));
  }


  const getCurrencyRate = (currency) => {
    if (currency === 'UAH') {
      return 1
    } else {
      return rates.length ? rates.find(({ cc }) => cc === currency).rate : null;
    }
  }
  React.useEffect(() => {
    inputToPrice(toPrice);
  }, [fromCurrency])

  React.useEffect(() => {
    inputFromPrice(fromPrice);
  }, [toCurrency])


  return (
    <div className="App">
      <div className="app-wrapper">
        <Header rateUsd={getCurrencyRate("USD")} rateEur={getCurrencyRate("EUR")} />
        <div className="blocks-wrapper">
          <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} inputPrice={inputFromPrice}/>
          <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} inputPrice={inputToPrice}/>
        </div>
      </div>
    </div>
  );
}

export default App;
