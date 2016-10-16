import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Navigator, AsyncStorage } from 'react-native';
import Button from './../components/Button';
import {q, db} from './../firebaseConfig';

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
  componentWillMount() {

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

    q.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(error){
      let errorMessage = error.message;
      this.setState({errorMessage});
    }.bind(this))

    alert('Hit');

    q.auth().onAuthStateChanged((user) => {
        if (user) {
            // alert(user.displayName + user.uid);
            let data = {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                loggedIn: true
            }
            AsyncStorage.setItem('@superStore:user', JSON.stringify(data));
            this.props.navigator.push({
                id: 'dashboard'
            });
        }
    })

  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./../images/logo.png')} style={styles.logo}/>
        <Text style={{textAlign: 'center', fontWeight: 'bold', paddingRight: 20, paddingLeft: 20}}>{this.state.errorMessage}</Text>
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
        <Text>{this.state.user}</Text>
        <Button onPressButton={this.handleLogin.bind(this)} btnStyle={[styles.btn, styles.login]}>Login</Button>
        <Button btnStyle={styles.goto} onPressButton={this.goToSignup.bind(this)}>Don't have an account?</Button>

        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff7473',
    justifyContent: 'center',
    alignItems: 'center'
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
