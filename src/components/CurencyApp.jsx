import { useState, useEffect } from "react";

const CurrencyApp = () => {
  const initChosenAmount = 1;
  const initChosenCurrency = "USD";
  const initCurrencies = [];
  const [chosenAmount, setChosenAmount] = useState(initChosenAmount);
  const [chosenCurrency, setChosenCurrency] = useState(initChosenCurrency);
  const [currencies, setCurrencies] = useState(initCurrencies);
  const NBP_API_URL =
    "https://api.nbp.pl/api/exchangerates/tables/a/?format=json";

  useEffect(() => {
    fetch(NBP_API_URL)
      .then((response) => response.json())
      .then((data) => setCurrencies(data[0].rates))
      .catch((err) => console.error(err));
  }, []);

  // functions

  const calculatedCurrency = () => {
    const chosenCurrencyValue = currencies.find(
      ({ code }) => code === chosenCurrency
    )?.mid;

    return (chosenAmount * chosenCurrencyValue).toFixed(4);
  };

  // events
  const changeChosenAmount = (e) => setChosenAmount(e.target.value);
  const changeChosenCurrency = (e) => setChosenCurrency(e.target.value);

  return (
    <div className="container">
      <h1>PRZELICZNIK KURSÓW WALUT </h1>
      <p>Sprawdź dzisiejsze kursy </p>
      <div className="values">
        <div className="values-left">
          <input
            type="number"
            onChange={changeChosenAmount}
            value={chosenAmount}
          />
          <select onChange={changeChosenCurrency} value={chosenCurrency}>
            {currencies.map(({ code }) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <p className="equals">=</p>
        <div className="values-right">
          <input
            type="number"
            value={calculatedCurrency()}
            className="amount2"
            disabled
          />
          <select id="currency2">
            <option value="PLN">PLN</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CurrencyApp;
