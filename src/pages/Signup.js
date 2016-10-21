import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Navigator, AsyncStorage, Dimensions } from 'react-native';
import Button from './../components/Button';
import {q, db} from './../firebaseConfig';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      user: ''
    };
  }
  handleSignup() {
    let email = this.state.email;
    let password = this.state.password;
    q.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
      // Handle errors
      q.auth().signOut().then(function() {

      }, function(error) {

      });
      let errorCode = error.code;
      let errorMessage = error.message;
      this.setState({errorMessage});

    }.bind(this));
    
    let user = q.auth().currentUser; 
    alert(JSON.stringify(user));
      /* if(user !== null) {

        let data = {
          loggedIn: true,
          name: user.displayName,
          email: user.email,
          id: user.uid
        }
        AsyncStorage.setItem('@superStore:user', JSON.stringify(data));
        this.props.navigator.immediatelyResetRouteStack([{id: 'role'}]);
    } */
    

  }

  kill() {
    this.props.navigator.push({
      id: 'role'
    })
  }
  goToLogin() {
    this.props.navigator.push({
      id: 'login'
    })
  }
  render() {
    return (
      <Image style={styles.container} source={require('./../images/s2.png')}>
        <Image source={require('./../images/logo.png')} style={styles.logo}/>
        <Text style={{textAlign: 'center', fontWeight: 'bold',paddingRight: 20, paddingLeft: 20}}>{this.state.errorMessage}</Text>
        <View style={styles.signupContainer}>
          <TextInput
            placeholder="Enter Email..."
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
        <Button onPressButton={this.handleSignup.bind(this)} btnStyle={[styles.btn, styles.login]}>Secure Yourself</Button>
        <Button btnStyle={styles.goto} onPressButton={this.goToLogin.bind(this)}>Already have an account?</Button>
        <Text>{this.state.user}</Text>
        </View>
      </Image>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff7473',
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
    borderBottomColor: '#fff'
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
