import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    AsyncStorage,
    Navigator,
    TouchableHighlight
} from 'react-native';
import Button from './../components/Button';

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

  blah() {
    AsyncStorage.setItem('@superStore:user', 'user');
  }

  tantan() {
    AsyncStorage.getItem('@superStore:user', (err, result) => {
      alert(result);
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Image source={require('./../images/logo.png')} style={styles.logo}/>
        <Text style={styles.lead}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada at tellus imperdiet iaculis. </Text>
        <View style={styles.cta}>
          <Button onPressButton={this.goToSignup.bind(this)} btnStyle={[styles.btn, styles.signup]} elevation={5}>Signup</Button>
          <Button onPressButton={this.goToLogin.bind(this)} btnStyle={[styles.btn, styles.login]}>Login</Button>
        </View>
        <TouchableHighlight onPress={this.blah.bind(this)}>
          <Text>Set</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.tantan.bind(this)}>
          <Text>Get</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 30,
      paddingLeft: 30,
      backgroundColor: '#47b8e0'
    },
    logo: {
      marginBottom: 20,
      resizeMode: 'contain',
      height: 150,
      flex: .3,
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
