import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    AsyncStorage,
    Navigator,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import Button from './../components/Button';

import general from './../general/mainStyle';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Splash extends Component {
  constructor() {
    super();

  }
  goToSignup() {
    this.props.navigator.push({
      id: 'signup'
    });
  }

  goToLogin() {
    this.props.navigator.push({
      id: 'login'
    });
  }


  render() {

    return (
      <Image style={styles.container} source={require('./../images/s1.jpg')}>
        <Image source={require('./../images/logo.png')} style={styles.logo}/>
        <Text style={styles.lead}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada at tellus imperdiet iaculis. </Text>
        <View style={styles.cta}>
          <Button onPressButton={this.goToSignup.bind(this)} btnStyle={[styles.btn, styles.signup]} elevation={5}>Signup</Button>
          <Button onPressButton={this.goToLogin.bind(this)} btnStyle={[styles.btn, styles.login]}>Login</Button>
        </View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
      marginBottom: 20,
      flex: .3,
      resizeMode: 'contain',
      height: 120,
      marginTop: 50
    },
    bigHeading: {
      fontSize: 70,
      textAlign: 'center',
      color: '#fff'
    },
    lead: {
      fontSize: 17,
      textAlign: 'center',
      color: '#fff',
      fontFamily: 'brandon',
      flex: 1
    },
    btn: {
      fontSize: 18,
      color: '#fff',
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 4,
      fontFamily: 'brandon',
      letterSpacing: 1,
      marginRight: 15
    },
    login: {
      backgroundColor: '#34314c'
    },
    signup: {
      backgroundColor: '#ffc952',
      elevation: 10
    },
    cta: {
      flexDirection: 'row',
      flex: 1
    },
});
