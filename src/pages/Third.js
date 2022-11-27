import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard.js/InfoCard';
import useFetch from '../hooks/useFetch/useFetch';
import axios from 'axios';
export default function Third({ route ,navigation}) {
  
  
  function goBack() {
    navigation.goBack();
  }

  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;
  useEffect(() => {
    randevuAl();
  }, []);
  const randevuAl = (kuaforid, date, address, type) => {
    //console.log(">>>>>"+kuaforid);
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
        //console.log(response.data.kuaforid + response.data.date + response.data.address);
        //console.log(response.data);
        // console.log(response.data.kuaforid);
        //console.log(kuaforid);
        randevuRezerve(kuaforid, type);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const randevuRezerve = (kuaforid, type) => {
    // Send a patch request
    switch (type) {
      case '0':
        axios({
          method: 'patch',
          url: Config.API_URL + kuaforid,

          data: {
            today: true,
          },
        })
          .then(function (response) {
            console.log('baglaniyo: ' + Config.API_URL + kuaforid);
            goBack();

            
          })
          .catch(function (error) {
            console.log('-----randevu Rezerve ' + error);
          });
        break;
      case '1':
        axios({
          method: 'patch',
          url: Config.API_URL + kuaforid,

          data: {
            tomorrow: true,
          },
        })
          .then(function (response) {
            console.log('baglaniyo: ' + Config.API_URL + kuaforid);
            goBack();
          })
          .catch(function (error) {
            console.log('-----randevu Rezerve ' + error);
          });

        break;
      case '2':
        axios({
          method: 'patch',
          url: Config.API_URL + kuaforid,

          data: {
            nextDay: true,
          },
        })
          .then(function (response) {
            console.log('baglaniyo: ' + Config.API_URL + kuaforid);
            goBack();
          })
          .catch(function (error) {
            console.log('-----randevu Rezerve ' + error);
          });
        break;

      default:
        break;
    }
  };

  const date = new Date();
  //console.log(date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const today = year + '-' + month + '-' + day;
  const tomorrow = year  + '-' + month + '-' + (day+1);
  const nextDay = year  + '-' + month + '-' + (day+2);
  const date1 = new Date(today);
  const date2 = new Date(tomorrow);
  const Difference_In_Time = date2.getTime() - date1.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  // const startDate = '2020-01-01';
  // const endDate = '2020-03-15';
  // const diffInMs = new Date(endDate) - new Date(startDate);
  // const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  // console.log("diffindays "+diffInDays);


  const {_id} = route.params;

  const {loading, error, data} = useFetch(`${Config.API_URL}/${_id}`);
  // console.log('>>>');
  // console.log(data);

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
                style={{
                  resizeMode: 'stretch',
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height * 0.2,
                }}
                source={{
                  uri: !data.gender
                    ? 'https://t4.ftcdn.net/jpg/03/15/14/91/240_F_315149199_Dxpjpgtl2nZ6aw7Q8dPfn8O2mrK4zFy2.jpg'
                    : 'https://thumbs.dreamstime.com/b/dise%C3%B1o-retro-de-barberman-que-sostiene-las-podadoras-112127255.jpg',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      borderRadius: 15,
                      flexDirection: 'column',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        width: Dimensions.get('window').width,
                        borderWidth: 1,
                        textAlign: 'center',

                        fontWeight: 'bold',
                        fontSize: 30,
                        color: 'black',
                        backgroundColor: 'white',
                        opacity: 0.8,
                      }}>
                      {data.name}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <InfoCard
              text={data.name}
              imageUri="https://pic.onlinewebfonts.com/svg/img_568656.png"></InfoCard>
            <View style={styles.a} />
            <InfoCard
              text={data.email}
              imageUri="https://www.freepnglogos.com/uploads/email-png/company-email-svg-png-icon-download-18.png"></InfoCard>
            <View style={styles.a} />
            <InfoCard
              text={data.phone}
              imageUri="http://cdn.onlinewebfonts.com/svg/img_558585.png"></InfoCard>
            <View style={styles.a} />
            <InfoCard
              text={data.address}
              imageUri="https://pixsector.com/cache/2102b688/av924d89f198e4e084336.png"></InfoCard>
            <View style={styles.a} />
            <View style={{marginTop: 15}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                Randevu Al
              </Text>
            </View>
            {/* *********************     TODAY           ***************************** */}
            <View
              style={{
                height: h * 0.08,
                backgroundColor: 'brown',
                borderRadius: 15,
                margin: 10,
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
                {today}
              </Text>
            </View>
            <TouchableOpacity
              disabled={data.today}
              onPress={() => createTwoButtonAlert(today, '0')}>
              <View
                style={{
                  height: h * 0.05,
                  backgroundColor: !data.today ? 'green' : 'gray',
                  borderRadius: 15,
                  marginHorizontal: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
                  {!data.today ? 'Müsait' : 'Meşgul'}
                </Text>
              </View>
            </TouchableOpacity>
            {/* *********************     TOMORROW           ***************************** */}
            <View
              style={{
                height: h * 0.08,
                backgroundColor: 'brown',
                borderRadius: 15,
                margin: 10,
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
                {tomorrow}
              </Text>
            </View>
            <TouchableOpacity
              disabled={data.tomorrow}
              onPress={() => createTwoButtonAlert(tomorrow, '1')}>
              <View
                style={{
                  height: h * 0.05,
                  backgroundColor: !data.tomorrow ? 'green' : 'gray',
                  borderRadius: 15,
                  marginHorizontal: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
                  {!data.tomorrow ? 'Müsait' : 'Meşgul'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* *********************     NEXT DAY           ***************************** */}
            <View
              style={{
                height: h * 0.08,
                backgroundColor: 'brown',
                borderRadius: 15,
                margin: 10,
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
                {nextDay}
              </Text>
            </View>
            <TouchableOpacity
              disabled={data.nextDay}
              onPress={() => createTwoButtonAlert(nextDay, '2')}>
              <View
                style={{
                  height: h * 0.05,
                  backgroundColor: !data.nextDay ? 'green' : 'gray',
                  borderRadius: 15,
                  marginHorizontal: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
                  {!data.nextDay ? 'Müsait' : 'Meşgul'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height: 70}} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
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
});
