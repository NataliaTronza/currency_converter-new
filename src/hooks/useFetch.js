import React from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    setLoading(true);
    axios.get(url).then(response => {
      setData(response.data);
    }).catch((err) => {
      setError(err);
      console.error('Помилка:', error);
      alert('Не вдалося отримати дані')
    }).finally(() => {
      setLoading(false)
    })
  }, [url]);

  return { data, loading, error }
};

export default useFetch;