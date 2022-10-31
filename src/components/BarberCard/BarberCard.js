import React from "react";
import {View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

const BarberCard = props => {
    return (
      <TouchableOpacity onPress={()=>console.log("+")}>
        <View style={styles.container}>
          <Text style={styles.text}>{props.name}</Text>
        </View>
      </TouchableOpacity>
    );  
};

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.2,
        width: Dimensions.get('window').width / 2 - 10,
    
        backgroundColor: 'gray',
        textAlign: 'center',
        margin: 5,
        borderRadius: 10,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',

    }


    
});

export default BarberCard;