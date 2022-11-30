import {useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = url => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
    
      //   const response = await axios.get(url);
      //   setData(response.data);

      const {data: responseData} = await axios.get(url);
      setData(responseData);
      
    

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {error, loading, data};
};

export default useFetch;
