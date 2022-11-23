import React, {useState, useEffect} from 'react';
import {StyleSheet,Text,View,SafeAreaView,ActivityIndicator,FlatList,Button,Dimensions,Touchable,TouchableOpacity,Image,} from 'react-native';
import BarberCard from '../components/BarberCard/BarberCard';
import SearchBar from '../components/SearchBar/SearchBar';
import SwitchSelector from 'react-native-switch-selector';
import Config from 'react-native-config';


const axios = require('axios');


const App = ({ navigation }) => {
  const handleBarberSelect = _id => {
    
    navigation.navigate("Third",{_id});
  };
  const renderBarberCard = ({item}) => {
    //console.log(item);
    //console.log("------------------------------");

    return <BarberCard onSelect={()=>handleBarberSelect(item._id)} item={item}></BarberCard>;
  };

  const [gender, setGender] = useState(false);

  const [list, setList] = useState([]);
  //: .2 list çözdü
  const [list2, setList2] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = text => {
    const filteredList = list2.filter(
      barber => {
      const searchedText = text.toLowerCase();
      const currentTitle = barber.name.toLowerCase();
      return currentTitle.indexOf(searchedText) > -1;
      }
    );
    setList(filteredList);
  };


  const handleGender = (value) => {
    const filteredlist = list2
      .filter(item => {
        return item.gender == value;
      });
    //console.log(filteredlist);
    
     setList(filteredlist);
   
  };

  function getBarbers() {
    //console.log(Config.API_URL);
    axios
      .get(Config.API_URL)
      .then(function (response) {
        setList(response.data);
        setList2(response.data);
        setLoading(false);
        // handle success
        //console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        //console.log(error);
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
          {label: 'Erkek', value: true}, //images.feminino = require('./path_to/assets/img/feminino.png')
          {label: 'Kadın', value: false}, //images.masculino = require('./path_to/assets/img/masculino.png')
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
          keyExtractor={item => item.id}
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
