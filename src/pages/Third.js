import React, {isValidElement, useEffect, useState} from 'react';
import {View,Text,Button,Image,Dimensions,StyleSheet,ImageBackground,ScrollView,FlatList,TouchableOpacity,Alert,
} from 'react-native';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard.js/InfoCard';
import useFetch from '../hooks/useFetch/useFetch';
import axios from 'axios';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const manBarberImage =
  'https://t4.ftcdn.net/jpg/03/15/14/91/240_F_315149199_Dxpjpgtl2nZ6aw7Q8dPfn8O2mrK4zFy2.jpg';
const womenBarberImage =
  'https://thumbs.dreamstime.com/b/dise%C3%B1o-retro-de-barberman-que-sostiene-las-podadoras-112127255.jpg';
const ppImage = 'https://pic.onlinewebfonts.com/svg/img_568656.png';
const mailImage =
  'https://www.freepnglogos.com/uploads/email-png/company-email-svg-png-icon-download-18.png';
const phoneImage = 'http://cdn.onlinewebfonts.com/svg/img_558585.png';
const addressImage =
  'https://pixsector.com/cache/2102b688/av924d89f198e4e084336.png';
const make_appointment = 'Randevu Al';
export default function Third({ route, navigation }) {
  function goBack() {
    navigation.goBack();
  }

  
  useEffect(() => {
    randevuAl();
  }, []);

  // post to all appointments and then to  randevuRezerve(kuaforid, type);
  const randevuAl = (kuaforid, date, address, type) => {
    axios({
      method: 'post',
      url: Config.API + '/randevularim',
      data: {
        kuaforid: kuaforid,
        date: date,
        address: address,
      },
    })
      .then(function (response) {
        randevuRezerve(kuaforid, type);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const randevuRezerve = (kuaforid, type) => {
    const availableData = {};
 
    if (type == '0') availableData.today = true;
    else if (type == '1') availableData.tomorrow = true;
    else if (type == '2') availableData.nextDay = true;
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
          //if nothing changed we dont go back
          var isNotEmpty = Object.entries(availableData).length > 0;
          if (isNotEmpty) {
            console.log('not empty');
            alert('Randevu Alındı');
            goBack();
          } else {
            console.log('empty');
          }
        })
        .catch(function (error) {
          console.log('-----randevu Rezerve ' + error);
        });
  };
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const today = year + '-' + month + '-' + day;
  const tomorrow = year + '-' + month + '-' + (day + 1);
  const nextDay = year + '-' + month + '-' + (day + 2);
  
  const {_id} = route.params;
  const {loading, error, data} = useFetch(`${Config.API_URL}/${_id}`);

  //to randevuAl(_id, day, data.address, type);
  const createTwoButtonAlert = (day, type) =>
    Alert.alert(
      'Randevuyu Onayla',
      `${day} tarihi için randevu almak istediğinize emin misiniz`,
      [
        {
          text: 'Hayır',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            randevuAl(_id, day, data.address, type);
            console.log('------' + _id);
          },
        },
      ],
    );
  // to createTwoButtonAlert(day, type)
  function myAppointments(day, isAvailable, type) {
    return (
      <View>
        <View style={styles.dayView}>
          <Text style={styles.day_text_style}>{day}</Text>
        </View>
        <TouchableOpacity
          disabled={isAvailable}
          onPress={() => createTwoButtonAlert(day, type)}>
          <View
            style={[
              styles.isAvailableView,
              {backgroundColor: !isAvailable ? 'green' : 'gray'},
            ]}>
            <Text style={styles.isAvailableText}>
              {!isAvailable ? 'Müsait' : 'Meşgul'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Error...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View>
            <View>
              <ImageBackground
                style={styles.image}
                source={{
                  uri: !data.gender ? manBarberImage : womenBarberImage,
                }}>
                <View style={styles.barberLabel}>
                  <View style={styles.viewAlign}>
                    <Text style={styles.barber_label_text}>{data.name}</Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <InfoCard text={data.name} imageUri={ppImage}></InfoCard>
            <View style={styles.a} />
            <InfoCard text={data.email} imageUri={mailImage}></InfoCard>
            <View style={styles.a} />
            <InfoCard text={data.phone} imageUri={phoneImage}></InfoCard>
            <View style={styles.a} />
            <InfoCard text={data.address} imageUri={addressImage}></InfoCard>
            <View style={styles.a} />
            <View style={{marginTop: 15}}>
              <Text style={styles.header_text}>{make_appointment}</Text>
            </View>
            {myAppointments(today, data.today, '0')}
            {myAppointments(tomorrow, data.tomorrow, '1')}
            {myAppointments(nextDay, data.nextDay, '2')}
          </View>
          <View style={{height: 70}} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  a: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: w * 0.05,
  },
  image: {
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.2,
  },
  barberLabel: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  viewAlign: {
    borderRadius: 15,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  barber_label_text: {
    width: Dimensions.get('window').width,
    borderWidth: 1,
    textAlign: 'center',

    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    backgroundColor: 'white',
    opacity: 0.8,
  },
  header_text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  dayView: {
    height: h * 0.08,
    backgroundColor: 'brown',
    borderRadius: 15,
    margin: 10,
    justifyContent: 'center',
  },
  day_text_style: {textAlign: 'center', fontSize: 20, color: 'white'},
  isAvailableView: {
    height: h * 0.05,
    borderRadius: 15,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  isAvailableText: {textAlign: 'center', fontSize: 20, color: 'white'},
});
