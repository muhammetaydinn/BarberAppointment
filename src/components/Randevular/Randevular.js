import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Config from 'react-native-config';
import useFetch from '../../hooks/useFetch/useFetch';
import axios from 'axios';

//TODO: NAME BOOLUPDATEFALSE
const RandevularCard = ({ item, navigation }) => {
  function booleanUpdate(date, kuaforid) {
    const availableData = {};
    const checkToday = diffInToday(date);
    if (checkToday == 0) availableData.today = false;
    else if (checkToday == 1) availableData.tomorrow = false;
    else if (checkToday == 2) availableData.nextDay = false;
    else {
      console.log('default');
    }
    axios({
      method: 'patch',
      url: Config.API_URL + kuaforid,
      data: availableData,
    })
      .then(function (response) {
        console.log('baglaniyo: ' + Config.API_URL + kuaforid);
        console.log(availableData);
        goBack();
      })
      .catch(function (error) {
        console.log('-----randevu Rezerve ' + error);
      });
  }

  function randevularimdanSil(id, kuaforid, date) {
    axios
      .delete(`${Config.API}/randevularim/${id}`)
      .then(res => {
        console.log('>>>>> randevu silindi');
      })
      .then(() => {
        booleanUpdate(date, kuaforid);
      })
      .catch(err => {
        console.log('>>>>> randevu silinemedi' + err);
      });
  }
  //TODO: moment library dif
  function diffInToday(date1) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const today = year + '-' + month + '-' + day; // bugünün kalansız string hali
    const date2 = new Date(today); //bugünün normal formatı
    const date3 = new Date(date1); //date1 in normal formatı
    const Difference_In_Time = date3.getTime() - date2.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  }
  {
  }
  const createTwoButtonAlert = (id, kuaforid, date) => {
    console.log('>>>>> date ' + date);

    Alert.alert(
      'Emin misiniz?',
      'Seçili Randevuyu iptal etmek istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            //TODO:
            randevularimdanSil(id, kuaforid, date);
          },
        },
      ],
    );
  };
   function goBack() {
     navigation.goBack();
   }

 
    const {loading, error, data} = useFetch(
      `${Config.API_URL}${item.kuaforid}`,
  );

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View style={styles.innest_container1}>
          <Text style={styles.date_text}>{item.date}</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            <Text style={styles.barber_label}>{data.name}</Text>
              <Text style={styles.barber_address}>{data.address} </Text>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <Text style={styles.barber_address}>{data.phone} </Text>

                <TouchableOpacity onPress={() => {
                  console.log(
                    '>>>>> alınan randevunun berber idsi:' + item.kuaforid,
                  );// alınan randevunun berber idsi
                  console.log(
                    '>>>>> musterinin aldıgı randevu idsi: ' + item._id,
                  );//musterinin aldıgı randevu idssi
                  createTwoButtonAlert(item._id, item.kuaforid, item.date);
                 

                 

                }}>
                  <View style={styles.cancel_button}>
                    <Text style={{fontSize:17,fontWeight:'900'}}>
                      Iptal Et
                    </Text>

                  </View>

                </TouchableOpacity>
              </View>
          </View>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width,
  },
  inner_container: {
    height: Dimensions.get('window').height * 0.25,
    margin: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  innest_container1: {
    height: Dimensions.get('window').height * 0.07,
    backgroundColor: 'purple',
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  date_text: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  barber_label: {
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 21,
    color: 'white',
    fontWeight: '500',
  },
  barber_address: {
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  cancel_button: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.2,
    backgroundColor: '#ff77a9',
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default RandevularCard;
