import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard.js/InfoCard';
import useFetch from '../hooks/useFetch/useFetch';
import Config from 'react-native-config';
import RandevularCard from '../components/Randevular/Randevular';
//TODO: NAMING, ENDPOINT INDEX , MAKE SAME APP THAT ALI ADDED YOU COLLAB GITHUB,
const ppImage = 'https://pic.onlinewebfonts.com/svg/img_568656.png';
const mailImage =
  'https://www.freepnglogos.com/uploads/email-png/company-email-svg-png-icon-download-18.png';
const phoneImage = 'http://cdn.onlinewebfonts.com/svg/img_558585.png';
const passwordImage =
  'https://www.pngmart.com/files/16/Vector-Key-PNG-Transparent-Image.png';

const header = 'Kullanıcı Bilgilerim';
const user_name = 'haydar haydarolu';
const user_mail = 'haydarhaydarolu@gmail.com';
const user_phone = '+90 5555555555';
const user_password = '********';
const appointments = 'Randevularım';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function Second({navigation}) {
  const {loading, error, data} = useFetch(Config.API + '/randevularim');
  //buradan kuafor id gidiyor orda barbersten cekecek
  const renderRandevularCard = ({item}) => {
    return <RandevularCard item={item} navigation={navigation}></RandevularCard>;
  };

  //TODO: assa al react query
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.profile}
          source={{
            uri: ppImage,
          }}></Image>
      </View>
      <View style={styles.space}></View>
      <View>
        <Text style={styles.header_text}>{header}</Text>
      </View>
      <View style={styles.space3}></View>
      <InfoCard text={user_name} imageUri={ppImage}></InfoCard>
      <View style={styles.seperator} />
      <InfoCard text={user_mail} imageUri={mailImage} />
      <View style={styles.seperator} />
      <InfoCard text={user_phone} imageUri={phoneImage}></InfoCard>
      <View style={styles.seperator} />
      <InfoCard text={user_password} imageUri={passwordImage}></InfoCard>
      <View style={styles.seperator} />
      <View style={{marginTop: 15}}>
        <Text style={styles.header_text}>{appointments}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderRandevularCard}
          keyExtractor={item => item._id}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: w * 0.2,
    height: w * 0.2,
    alignSelf: 'center',
    marginTop: 50,
  },
  space: {height: h * 0.01},
  header_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  space3: {height: h * 0.03},
  seperator: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: w * 0.05,
  },
});
