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
import Config from 'react-native-config';
const axios = require('axios');

const App = ({navigation}) => {
  const handleBarberSelect = _id => {
    navigation.navigate('Third', {_id});
  };
  const renderBarberCard = ({item}) => {
    return (
      <BarberCard
        onSelect={() => handleBarberSelect(item._id)}
        item={item}></BarberCard>
    );
  };

  const [gender, setGender] = useState(false);

  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]); //TODO:naming is bad
  const [loading, setLoading] = useState(true);

  const handleSearch = text => {
    const filteredList = list2.filter(barber => {
      const searchedText = text.toLowerCase();
      const currentTitle = barber.name.toLowerCase();
      return currentTitle.indexOf(searchedText) > -1;
    });
    setList(filteredList);
  };

  const handleGender = value => {
    const filteredlist = list2.filter(item => {
      return item.gender == value;
    });

    setList(filteredlist);
  };

  //TODO:useFetchi kullan
  function getBarbers() {
    axios
      .get(Config.API_URL)
      .then(function (response) {
        setList(response.data);
        setList2(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
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
          //console.log(value);
          setGender(value);
          handleGender(value);
        }}
        textColor={'gray'} //'#7a44cf'
        selectedColor={'white'}
        buttonColor={'gray'}
        borderColor={'gray'}
        hasPadding
        options={[
          {label: 'Erkek', value: true}, 
          {label: 'Kadın', value: false}, 
        ]}
        testID="gender-switch-selector"
        accessibilityLabel="gender-switch-selector"
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          refreshing={loading}
          onRefresh={getBarbers}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={list}
          renderItem={renderBarberCard}
          keyExtractor={(item,index) => index}
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
