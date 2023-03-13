import React from 'react';
import './App.scss';
import Block from './Block';
import Header from './Header';
function App() {
  const [rates, setRates] = React.useState([]);
  const [fromCurrency, setFromCurrency] = React.useState('UAH');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        const data = await response.json();
        setRates(data);
      } catch (error) {
        console.error('Помилка:', error);
        alert('Не вдалося отримати дані')
      }
    };

    fetchData();

  }, []);


  const inputFromPrice = (value) => {
    setFromPrice(value);
    const fromCurrencyRate = getCurrencyRate(fromCurrency);
    const toCurrencyRate = getCurrencyRate(toCurrency);
    const price = fromCurrencyRate / toCurrencyRate;
    const result = value * price;
    setToPrice(result.toFixed(2));
  }

  const inputToPrice = (value) => {
    setToPrice(value);
    const fromCurrencyRate = getCurrencyRate(fromCurrency);
    const toCurrencyRate = getCurrencyRate(toCurrency);
    const result = (toCurrencyRate / fromCurrencyRate) * value;
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
          <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} inputPrice={inputFromPrice} />
          <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} inputPrice={inputToPrice} />
        </div>
      </div>
    </div>
  );
}

export default App;
