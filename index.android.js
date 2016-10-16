import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  AsyncStorage
} from 'react-native';

import Splash from './src/pages/Splash';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Role from './src/pages/Role';
import Dashboard from './src/pages/Dashboard';
import AddParent from './src/pages/Add';
import Help from './src/pages/Help';
import Timeline from './src/pages/Timeline';

class login extends Component {

  constructor() {
    super();
    AsyncStorage.getItem('@superStore:user', (err, result) => {
      let user = JSON.parse(result);
      if(user) {
        if (user.loggedIn) {
            this.initialRoute = 'dashboard';
        }
      }
    })
  }

  endme() {
    AsyncStorage.getItem('@superStore:user', (err, result) => {
      let user = JSON.parse(result);
      if (user.loggedIn) {
        alert('looged');
        return 'dashboard';
      } else {
        return 'splash';
      }
    })
  }

  render() {

return (
      <Navigator
        initialRoute = {{
          id: 'timeline'
        }}
        renderScene={
          this.navigatorRenderScene
        }
      />
    );
  }
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'splash':
        return(<Splash navigator={navigator} />);
      case 'login':
        return(<Login navigator={navigator} />);
      case 'signup':
        return(<Signup navigator={navigator} />);
      case 'role':
        return(<Role navigator={navigator} />);
      case 'dashboard':
        return(<Dashboard navigator={navigator} />);
      case 'add':
        return(<AddParent navigator={navigator} />);
      case 'help':
        return(<Help navigator={navigator} />);
      case 'timeline':
        return(<Timeline navigator={navigator} />);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('login', () => login);
