import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard.js/InfoCard';
import useFetch from '../hooks/useFetch/useFetch';
import Config from 'react-native-config';
/* 
637bf98c27430419a412b88d
*/
export default function Fourth(props) {
  const date = new Date();
  //console.log(date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const today = day + '.' + month + '.' + year;
  const tomorrow = day + 1 + '.' + month + '.' + year;
  const nextDay = day + 2 + '.' + month + '.' + year;
  const {loading, error, data} = useFetch(
    Config.API_URL + '637bf98c27430419a412b88d',
  );
  console.log(data);
  //buradan kuafor id gidiyor orda barbersten cekecek

  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;
  //console.log(props);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
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
            }}></ImageBackground>
        </View>
        <View style={{height: h * 0.01}}></View>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              color: 'black',
              paddingTop: 10,
            }}>
            Kuaför Bilgilerim
          </Text>
        </View>
        <View style={{height: h * 0.03}}></View>
        <InfoCard
          text={data.name}
          imageUri="https://pic.onlinewebfonts.com/svg/img_568656.png"></InfoCard>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            marginHorizontal: w * 0.05,
          }}
        />
        <InfoCard
          text={data.email}
          imageUri="https://www.freepnglogos.com/uploads/email-png/company-email-svg-png-icon-download-18.png"></InfoCard>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            marginHorizontal: w * 0.05,
          }}
        />
        <InfoCard
          text={data.phone}
          imageUri="http://cdn.onlinewebfonts.com/svg/img_558585.png"></InfoCard>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            marginHorizontal: w * 0.05,
          }}
        />
        <InfoCard
          text={data.address}
          imageUri="https://pixsector.com/cache/2102b688/av924d89f198e4e084336.png"></InfoCard>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            marginHorizontal: w * 0.05,
          }}
        />
        <InfoCard
          text="********"
          imageUri="https://www.pngmart.com/files/16/Vector-Key-PNG-Transparent-Image.png"></InfoCard>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            marginHorizontal: w * 0.05,
          }}
        />
        <View style={{marginTop: 15}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Randevularım
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            {data.today ? (
              <View
                style={{
                  height: h * 0.2,
                  backgroundColor: 'green',
                  borderRadius: 5,
                  margin: 10,
                }}>
                <View
                  style={{
                    height: h * 0.06,
                    backgroundColor: 'gray',
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      color: 'white',
                      fontWeight: 'bold',
                      paddingTop: 10,
                      marginLeft: 20,
                    }}>
                    {today}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 20,
                    color: 'white',
                    fontWeight: 'bold',
                    marginLeft: 15,
                  }}>
                  Haydar Haydarolu
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 20,
                    color: 'white',
                    fontWeight: 'bold',
                    marginLeft: 15,
                  }}>
                  +90 555 555 55 55
                </Text>
              </View>
            ) : null}
            {data.tomorrow ? (
              <View
                style={{
                  height: h * 0.2,
                  backgroundColor: 'green',
                  borderRadius: 5,
                  margin: 10,
                }}>
                <View
                  style={{
                    height: h * 0.06,
                    backgroundColor: 'gray',
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      color: 'white',
                      fontWeight: 'bold',
                      paddingTop: 10,
                      marginLeft: 20,
                    }}>
                    {tomorrow}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 20,
                    color: 'white',
                    fontWeight: 'bold',
                    marginLeft: 15,
                  }}>
                  Haydar Haydarolu
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 20,
                    color: 'white',
                    fontWeight: 'bold',
                    marginLeft: 15,
                  }}>
                  +90 555 555 55 55
                </Text>
              </View>
            ) : null}
            {data.nextDay ? (
              <View
                style={{
                  height: h * 0.2,
                  backgroundColor: 'green',
                  borderRadius: 5,
                  margin: 10,
                }}>
                <View
                  style={{
                    height: h * 0.06,
                    backgroundColor: 'gray',
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      color: 'white',
                      fontWeight: 'bold',
                      paddingTop: 10,
                      marginLeft: 20,
                    }}>
                    {nextDay}
                  </Text>
                </View>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 20,
                    color: 'white',
                    fontWeight: 'bold',
                    marginLeft: 15,
                  }}>
                  Haydar Haydarolu
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 20,
                    color: 'white',
                    fontWeight: 'bold',
                    marginLeft: 15,
                  }}>
                  +90 555 555 55 55
                </Text>
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
/*
<Text>{data[0].date}</Text>
*/
