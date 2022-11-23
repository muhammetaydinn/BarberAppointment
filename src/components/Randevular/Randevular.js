import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Config from 'react-native-config';
import useFetch from '../../hooks/useFetch/useFetch';
const RandevularCard = ({ item }) => {
    //console.log('*********** id  ' + item.kuaforid);
    const {loading, error, data} = useFetch(
      `${Config.API_URL}${item.kuaforid}`,
    );
    //console.log(`${Config.API_URL}${item.kuaforid}`);
   // console.log(">>>>> data "+data.name);
  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View style={styles.innest_container1}>
          <Text style={styles.date_text}>{item.date}</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            <Text style={styles.barber_label}>{data.name}</Text>
            <Text style={styles.barber_address}>{data.address} </Text>
            <Text style={styles.barber_address}>{data.phone} </Text>
          </View>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width,
  },
  inner_container: {
    height: Dimensions.get('window').height * 0.25,
    margin: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  innest_container1: {
    height: Dimensions.get('window').height * 0.07,
    backgroundColor: 'purple',
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  date_text: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    },
    barber_label: {
        marginTop: 10,
        textAlign: 'left',
        marginLeft: 20,
        fontSize: 21,
        color: 'white',
        fontWeight: '500',
    },
    barber_address: {
        marginTop: 10,
        textAlign: 'left',
        marginLeft: 20,
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
    },
    
  
});

export default RandevularCard;
