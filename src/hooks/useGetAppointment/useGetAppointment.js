import {useEffect, useState} from 'react';
import axios from 'axios';
import Config from 'react-native-config';
//TODO DELETE THIS AND USE
const useGetAppointment = url => {
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState();
  const [data1, setData1] = useState([]);

  const fetchData = async () => {
    try {
        const response = await axios.get(`${Config.API}/randevularim/`);
      setData1(response.data);
      console.log(response.data);
      setLoading1(false);
    } catch (err) {
      setError1(err.message);
      setLoading1(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {error1, loading1, data1};
};

export default useGetAppointment;
