import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Navigator, AsyncStorage, Dimensions, ScrollView } from 'react-native';
import Button from './../components/Button';
import {q, db} from './../firebaseConfig';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      user: ''
    };
  }


  back() {
    this.props.navigator.pop();
  }
  goToSignup() {
    this.props.navigator.push({
      id: 'signup'
    })
  }
  handleLogin() {

   q.auth().signOut().then(function() {

   }, function(error) {

   });
   q.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error){
      this.setState({errorMessage: error.message});
    }.bind(this));
    
    q.auth().onAuthStateChanged(function(user){
      if(user !== null) {
          let data = {
            loggedIn: true,
            name: user.displayName,
            email: user.email,
            id: user.uid
          }
          AsyncStorage.setItem('@superStore:user', JSON.stringify(data));
          this.props.navigator.immediatelyResetRouteStack([{id: 'timeline'}]);
      }
    }.bind(this))


  }

  render() {
    return (
      <Image style={styles.container} source={require('./../images/restaurant.png')}>
        <Image source={require('./../images/logo.png')} style={styles.logo}/>
        <Text style={{textAlign: 'center', fontWeight: 'bold', paddingRight: 20, paddingLeft: 20}}>{this.state.errorMessage}</Text>
        <ScrollView style={styles.signupContainer}>
          <TextInput
            placeholder="Enter email..."
            keyboardType="email-address"
            onChangeText={(email) => this.setState({email})}
            style={styles.myinput}
          ></TextInput>
          <TextInput
            placeholder="Enter Password..."
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            style={styles.myinput}
          ></TextInput>
        <Text>{this.state.user}</Text>
        <Button onPressButton={this.handleLogin.bind(this)} btnStyle={[styles.btn, styles.login]}>Login</Button>
        <Button btnStyle={styles.goto} onPressButton={this.goToSignup.bind(this)}>Dont have an account?</Button>

        </ScrollView>
      </Image>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height
  },
  goto: {
    textAlign: 'center',
    marginTop: 10
  },
  signupContainer: {
    // borderWidth: 2,
    // borderColor: '#000',
  },
  myinput: {
    width: 250,
    borderRadius: 10,
    fontFamily: 'brandon',
    borderBottomColor: '#fff',
    fontSize: 20
  },
  logo: {
    resizeMode: 'contain',
    height: 150,
    marginBottom: 20
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
    //marginRight: 15,
    marginTop: 20,
    textAlign: 'center'
  },
  login: {
    backgroundColor: '#ffc952',
    elevation: 10,

  },
});
