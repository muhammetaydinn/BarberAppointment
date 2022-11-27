import React, {useState, useEffect} from 'react';
import {View,Text,Button,Image,Dimensions,FlatList,ActivityIndicator,ImageBackground,ScrollView,Touchable,TouchableOpacity,StyleSheet, Alert,} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard.js/InfoCard';
import useFetch from '../hooks/useFetch/useFetch';
import Config from 'react-native-config';
import axios from 'axios';
import useGetAppointment from '../hooks/useGetAppointment/useGetAppointment';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const genderImage1 ='https://t4.ftcdn.net/jpg/03/15/14/91/240_F_315149199_Dxpjpgtl2nZ6aw7Q8dPfn8O2mrK4zFy2.jpg';
const genderImage2 ='https://thumbs.dreamstime.com/b/dise%C3%B1o-retro-de-barberman-que-sostiene-las-podadoras-112127255.jpg';
const text1 = 'Kuaför Bilgilerim';
const ppImage = 'https://pic.onlinewebfonts.com/svg/img_568656.png';
const emailImage ='https://www.freepnglogos.com/uploads/email-png/company-email-svg-png-icon-download-18.png';
const phoneImage = 'http://cdn.onlinewebfonts.com/svg/img_558585.png';
const addressImage ='https://pixsector.com/cache/2102b688/av924d89f198e4e084336.png';
const passwordText = '********';
const passwordImage ='https://www.pngmart.com/files/16/Vector-Key-PNG-Transparent-Image.png';
const randevularimText = 'Randevularım';
const isim = 'Haydar Haydarolu';
const numara = '+90 555 555 55 55';
const cancelText = 'İptal Et';
const barberId = Config.API_URL + '637bf98c27430419a412b88d';


 const date = new Date();
 const day = date.getDate();
 const month = date.getMonth() + 1;
 const year = date.getFullYear();
 const today = year + '-' + month + '-' + day;
 const tomorrow = year + '-' + month + '-' + (day + 1);
 const nextDay = year + '-' + month + '-' + (day + 2);


export default function Fourth(props) {
  const [filtered, setFiltered] = useState([]);
  // boolen update calisiyor diffInToday icerir
  function booleanUpdate(date) {
    switch (diffInToday(date)) {
      case 0:
        axios({
          method: 'patch',
          url: barberId,

          data: {
            today: false,
          },
        })
          .then(function (response) {
            console.log('baglaniyo: ' + barberId);
          })
          .catch(function (error) {
            console.log('-----randevu Rezerve ' + error);
          });
        break;
      case 1:
        axios({
          method: 'patch',
          url: barberId,

          data: {
            tomorrow: false,
          },
        })
          .then(function (response) {
            console.log('baglaniyo: ' + barberId);
          })
          .catch(function (error) {
            console.log('-----randevu Rezerve ' + error);
          });

        break;
      case 2:
        axios({
          method: 'patch',
          url: barberId,

          data: {
            nextDay: false,
          },
        })
          .then(function (response) {
            console.log('baglaniyo: ');
          })
          .catch(function (error) {
            console.log('-----randevu Rezerve ' + error);
          });
        break;

      default:
        console.log('default');
        break;
    }
  }

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
  function randevularimdanSil(date,id) {
   console.log('>>>>> id ' + id + 'silinecek');
   axios
     .delete(`${Config.API}/randevularim/${id}`)
     .then(res => {
       console.log('>>>>> randevularimdanSil silindi');
     }).then(() => {
       booleanUpdate(date);
     })
     .catch(err => {
       console.log('>>>>> randevu silinemedi' + err);
     });
}
  const createTwoButtonAlert = (date,filtered) => {
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
            if (filtered.length > 0) {
               
               randevularimdanSil(date,filtered[0]._id);
            }
           
          },
        },
      ],
    );
  };

  //card
  function myAppointmentCard(gunString) {
    return (
      <View style={styles.view5}>
        <View style={styles.view6}>
          <Text style={styles.text3}>{gunString}</Text>
        </View>
        <View style={styles.view7}>
          <View style={styles.view8}>
            <Text style={styles.text4}>{isim}</Text>
            <Text style={styles.text4}>{numara}</Text>
          </View>
          <View style={styles.view9}>
            <TouchableOpacity
              style={styles.cancel_button}
              onPress={() => {
                const filteredData = data1.filter(
                  item =>
                    item.date === gunString &&
                    item.kuaforid === '637bf98c27430419a412b88d',
                );
                setFiltered(filteredData);
                  createTwoButtonAlert(gunString, filtered);
                
              }}>
              <Text style={styles.text5}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  //spesific barber
  const {error, loading, data} = useFetch(
    Config.API_URL + '637bf98c27430419a412b88d',
  );
  const {error1, loading1, data1} = useGetAppointment(Config.API+"/randevularim");



  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View>
          <ImageBackground
            style={styles.images_bg}
            source={{
              uri: !data.gender ? genderImage1 : genderImage2,
            }}></ImageBackground>
        </View>
        <View style={styles.view1}></View>
        <View>
          <Text style={styles.text1}>{text1}</Text>
        </View>
        <View style={styles.view2}></View>
        <InfoCard text={data.name} imageUri={ppImage}></InfoCard>
        <View style={styles.view3} />
        <InfoCard text={data.email} imageUri={emailImage}></InfoCard>
        <View style={styles.view3} />
        <InfoCard text={data.phone} imageUri={phoneImage}></InfoCard>
        <View style={styles.view3} />
        <InfoCard text={data.address} imageUri={addressImage}></InfoCard>
        <View style={styles.view3} />
        <InfoCard text={passwordText} imageUri={passwordImage}></InfoCard>
        <View style={styles.view3} />
        <View style={styles.view4}>
          <Text style={styles.text2}>{randevularimText}</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            <View>{data.today ? myAppointmentCard(today) : null}</View>
            <View>{data.tomorrow ? myAppointmentCard(tomorrow) : null}</View>
            <View>{data.nextDay ? myAppointmentCard(nextDay) : null}</View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
/*
<Text>{data[0].date}</Text>
*/
const styles = StyleSheet.create({
  container: {},
  images_bg: {
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.2,
  },
  cancel_button: {
    width: w * 0.2,
    height: h * 0.05,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    borderRadius: 5,
  },

  //       Texts

  text1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    paddingTop: 10,
  },
  text2: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  text3: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 10,
    marginLeft: 20,
  },
  text4: {
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  text5: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
 

  //         Views

  view1: {height: h * 0.01},
  view2: {height: h * 0.03},
  view3: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: w * 0.05,
  },
  view4: {marginTop: 15},
  view5: {
    height: h * 0.2,
    backgroundColor: 'red',
    borderRadius: 5,
    margin: 10,
  },
  view6: {
    height: h * 0.06,
    backgroundColor: 'gray',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  view7: {flexDirection: 'row', flex: 1, borderRadius: 5},
  view8: {flex: 2},
  view9: {flex: 1, justifyContent: 'center'},
});




