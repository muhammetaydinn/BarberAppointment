import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Button,
  Dimensions,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import BarberCard from '../components/BarberCard/BarberCard';
import SearchBar from '../components/SearchBar/SearchBar';
import SwitchSelector from 'react-native-switch-selector';

// get data from this URL!
const axios = require('axios');

const renderBarberCard = ({item}) => {
  return <BarberCard name={item.name}></BarberCard>;
};

const App = ({navigation}) => {
  const [gender, setGender] = React.useState('f');

  const [list, setList] = useState([]);
  //: .2 list çözdü
  const [list2, setList2] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = text => {
    const filteredList = list2.filter(barber => {
      const searchedText = text.toLowerCase();
      const currentTitle = barber.name.toLowerCase();
      return currentTitle.indexOf(searchedText) > -1;
    });
    setList(filteredList);
  };

  function getBarbers() {
    axios
      .get('http://192.168.1.123:3000/barbers')
      .then(function (response) {
        setList(response.data);
        setList2(response.data);
        setLoading(false);
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  useEffect(() => {
    getBarbers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: (Dimensions.get('window').width / 5.0) * 4,
          }}>
          <SearchBar onSearch={handleSearch} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Second')}
          style={{
            width: (Dimensions.get('window').width / 5.0) * 1,
          }}>
          <Image
            style={{flex: 1, resizeMode: 'center', tintColor: 'gray'}}
            source={{
              uri: 'https://pic.onlinewebfonts.com/svg/img_568656.png',
            }}></Image>
        </TouchableOpacity>
      </View>
      <SwitchSelector
        initial={1}
        onPress={value => {
          setGender(value);
          console.log('selected gender' + value);
        }}
        textColor={'gray'} //'#7a44cf'
        selectedColor={'white'}
        buttonColor={'gray'}
        borderColor={'gray'}
        hasPadding
        options={[
          {label: 'Erkek', value: 'm'}, //images.feminino = require('./path_to/assets/img/feminino.png')
          {label: 'Kadın', value: 'f'}, //images.masculino = require('./path_to/assets/img/masculino.png')
        ]}
        testID="gender-switch-selector"
        accessibilityLabel="gender-switch-selector"
      />
      {/* <View style={{marginVertical: 5, marginHorizontal: 100}}>
        <Button
          color="grey"
          title="Tum Berberler"
          onPress={getBarbers}></Button>
      </View> */}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={list.map((item, index) => {
            item.key = index.toString();
            return item;
          })}
          renderItem={renderBarberCard}
          keyExtractor={item => item._id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
