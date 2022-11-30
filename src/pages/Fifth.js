import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  Switch,
  Button,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import Config from 'react-native-config';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

function Kutu(a, setA, ph, ml) {
  return (
    <View style={{height: h * 0.13}}>
      <View style={{height: h * 0.035}}>
        <Text style={{marginLeft: 15, fontSize: 16, fontWeight: '700'}}>
          {ph}
        </Text>
      </View>
      <View style={{height: h * 0.07}}>
        <TextInput
          maxLength={ml}
          style={styles.container}
          placeholder={ph}
          onChangeText={newText => setA(newText)}
          defaultValue={a}
        />
      </View>
      <View style={{height: h * 0.1}} />
    </View>
  );
}

const Fifth = () => {
  //const [text, setText] = useState('');
  const time = new Date();
  const id = time.getTime();

  // milliseconds since Jan 1, 1970, 00:00:00.000 GMT

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  //const [gender, setGender] = useState(false); false = kadın, true = erkek
  const [isEnabled, setIsEnabled] = useState(false);

  function kuaforEkle(id, email, name, address, gender, phone) {
    axios({
      method: 'post',
      url: Config.API_URL,
      data: {
        id: id,
        email: email,
        name: name,
        address: address,
        gender: gender,
        phone: phone,
        today: false,
        tomorrow: false,
        nextDay: false,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log('-----randevu Rezerve ' + error);
      });
  }

  const createTwoButtonAlert = (
    fm,
    sm,
    id,
    email,
    name,
    address,
    gender,
    phone,
  ) => {
    Alert.alert(fm, sm, [
      {
        text: 'Hayır',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Evet',
        onPress: () => {
          //TODO:null kontrolü yapılacak
          //use english
          console.log('>>>>> id:' + id + "\n" + '>>>>> email:' + email + "\n" + '>>>>> name:' + name + "\n" + '>>>>> address:' + address +
          "phone:" + phone
          );
          kuaforEkle(id, email, name, address, gender, phone);
        },
      },
    ]);
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    console.log(!isEnabled ? 'kadın' : 'erkek');
  };

  return (
    <SafeAreaView>
      <View style={{height: h * 0.1}}>
        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '700',
          }}>
          Kuaför Ekleme Paneli
        </Text>
      </View>

      {Kutu(name, setName, 'Kuaför Adını Yazın', 30)}
      {Kutu(mail, setMail, 'Mail Adresinizi Yazın', 30)}
      {Kutu(phone, setPhone, 'Telefon Numaranızı Yazın (GSM)', 10)}
      {Kutu(address, setAddress, 'Adresinizi Yazın', 75)}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginLeft: 15, fontSize: 16, fontWeight: '700'}}>
          Kadın Kuaförü müsünüz ?
        </Text>
        <View style={{width: w * 0.1}}></View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={{height: h * 0.05}} />
      <View style={{alignItems: 'center'}}>
        <Button
          color={'gray'}
          onPress={() => {
            if (name.length<=5 || mail.length<10 || phone.length != 10 || address.length<=20) { 
              alert(
                'Lütfen tüm alanları doldurunuz',
              );
            }
            else {
               createTwoButtonAlert(
                 'Kontrol Edin',

                 'Adı: ' +
                   name +
                   '\n' +
                   'mail: ' +
                   mail +
                   '\n' +
                   'telefon: ' +
                   phone +
                   '\n' +
                   'adres: ' +
                   address +
                   '\n' +
                   'cinsiyet: ' +
                   (isEnabled ? 'kadın' : 'erkek'),
                 id,
                 mail,
                 name,
                 address,
                 isEnabled,
                 phone,
               );
           }
          }}
          title="     EKLE     "
        />
      </View>
    </SafeAreaView>
  );
};
export default Fifth;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    height: h * 0.07,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
