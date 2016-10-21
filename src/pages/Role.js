import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Navigator, AsyncStorage, TextInput } from 'react-native';
import Button from './../components/Button';
import {q, db} from '../firebaseConfig';

export default class Role extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }
  gotoDashboard() {
    this.props.navigator.push({
      id: 'dashboard'
    })
  }
  componentWillMount() {
    AsyncStorage.getItem('@superStore:user', function(error, result){
    }.bind(this));

  }

  handleProfile() {
    let user = q.auth().currentUser;
    user.updateProfile({
      displayName: this.state.name
    }).then(function(){
      let dbData = {
          email : q.auth().currentUser.email,
          name: q.auth().currentUser.displayName,
      }

      let uid = q.auth().currentUser.uid;

      db.ref('users/' + q.auth().currentUser.uid).set(dbData);

      let data = {
        loggedIn: true,
        email: dbData.email,
        name: this.state.name,
        id: uid,
      }
      AsyncStorage.setItem('@superStore:user', JSON.stringify(data));
      this.props.navigator.immediatelyResetRouteStack([{
        id: 'timeline'
      }])
    }.bind(this), function(error){
      alert('Cant sign in try later.');
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder={"Your Display Name..."} placeholderTextColor={'rgb(250, 250, 250)'} onChangeText={(name) => this.setState({name})} style={{width: 200, marginBottom: 40, color: '#fff'}}></TextInput>
        <View style={styles.roles}>
          { /*
          <View style={styles.role}>
            <Image source={require('./../images/man.png')} style={styles.img} />
            <Button onPressButton={() => this.setState({role: "Guardian"})} btnStyle={[styles.btn, styles.btn1]}>GUARDIAN</Button>
          </View>

          <View style={styles.role}>
            <Image source={require('./../images/women.png')} style={styles.img} />
            <Button onPressButton={() => this.setState({role: "Children"})} btnStyle={[styles.btn, styles.btn2]}>CHILDREN</Button>
          </View>
          */ }
        </View>
        <Button btnStyle={[styles.btn, styles.continue]} onPressButton={this.handleProfile.bind(this)}>Continue</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34314c',
  },
  heading: {
    color: '#fff',
    fontFamily: 'brandon',
    fontSize: 30,
    alignSelf: "center",
    marginTop: -40,
    marginBottom: 50,
    textAlign: 'center',
  },
  roles: {
    flexDirection: 'row'
  },
  role: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    resizeMode: 'contain',
    height: 100,
    marginBottom: 20,
    justifyContent: 'center',
  },
  btn: {
    fontSize: 12,
    color: '#fff',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    fontFamily: 'brandon',
    letterSpacing: 4,
    //marginRight: 15,
    marginTop: 20,
    textAlign: 'center'
  },
  btn1: {
    backgroundColor: '#ffc952',
    elevation: 10
  },
  btn2: {
    backgroundColor: '#ffc952',
    elevation: 10
  },
  continue: {
    backgroundColor: '#fff',
    fontSize: 20,
    flex: 1,
    color: '#333',
    alignSelf: 'flex-end',
    marginTop: 60
  }
})
