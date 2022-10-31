import React from 'react';
import {View, Text, Button, Image, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard.js/InfoCard';



export default function Second(props) {
  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;
    console.log(props);
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Image
          style={{
            width: w * 0.2,
            height: w * 0.2,
            alignSelf: 'center',
            marginTop: 50,
          }}
          source={{
            uri: 'https://pic.onlinewebfonts.com/svg/img_568656.png',
          }}></Image>
      </View>
      <View style={{height: h * 0.01}}></View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
          }}>
          Kullanıcı Bilgilerim
        </Text>
      </View>
      <View style={{height: h * 0.03}}></View>
      <InfoCard
        text="haydar haydarolu"
        imageUri="https://pic.onlinewebfonts.com/svg/img_568656.png"></InfoCard>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          marginHorizontal: w * 0.05,
        }}
      />
      <InfoCard
        text="haydarhaydarolu@gmail.com"
        imageUri="https://www.freepnglogos.com/uploads/email-png/company-email-svg-png-icon-download-18.png"></InfoCard>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          marginHorizontal: w * 0.05,
        }}
      />
      <InfoCard
        text="+905555555555"
        imageUri="http://cdn.onlinewebfonts.com/svg/img_558585.png"></InfoCard>
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
      <View style={{marginTop:15}}>
        <Text style={{textAlign:'center',fontSize:20,color:'black',fontWeight:'bold'}}>
          Randevularım
        </Text>
      </View>
    </SafeAreaView>
  );
}
