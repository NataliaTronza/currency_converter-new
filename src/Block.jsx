import React from 'react';

const defaultCurrencies = ['UAH', 'USD', 'EUR', 'GBP'];

const Block = ({ value, currency, onChangeCurrency, inputPrice }) => {
  //onChangeCurrency - Вибір валюти по кліку на вкладку
  //inputPrice - Функція для контрольваного інпуту
  const [open, setOpen] = React.useState(false);
  const sortRef = React.useRef();
  const onClickCurrency = (curr) => {
    onChangeCurrency(curr);
    setOpen(prev => !prev)
  }

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const path = event.path || (event.composedPath && event.composedPath());
      if (!path.includes(sortRef.current)) {
        setOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="block">
      <div className="input-wrapper">
        <input
          onChange={(e) => inputPrice(e.target.value)}
          value={value}
          type="number"
          placeholder={0}
        />
        <div className="sort" ref={sortRef}>
          <div className="sort__label" onClick={() => setOpen(prev => !prev)}>
            {currency}
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="1.41422" width="2" height="11" transform="rotate(-45 0 1.41422)" fill="#C0C0C0" />
              <rect x="14.1421" y="3.05176e-05" width="2" height="11" transform="rotate(45 14.1421 3.05176e-05)" fill="#C0C0C0" />
            </svg>
          </div>
          {
            open && (
              <ul className="sort__popup">
                {
                  defaultCurrencies.map((curr) => (
                    <li key={curr} onClick={() => onClickCurrency(curr)}>{curr}</li>
                  ))
                }
              </ul>
            )
          }
        </div>
      </div>
    </div>
  )
};

export default Block;
