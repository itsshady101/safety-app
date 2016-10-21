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
import AddParent from './src/pages/Add';
import Help from './src/pages/Help';
import Timeline from './src/pages/Timeline';
import Main from './src/pages/Main';
import News from './src/pages/News';
import Single from './src/pages/Single';
import Profile from './src/pages/Profile';

class login extends Component {


  constructor() {
    super();

  }


  render() {

    return (
      <Navigator
        initialRoute = {{
          id: 'main'
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
      case 'main':
        return(<Main navigator={navigator} />);
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
      case 'news':
        return(<News navigator={navigator} />);
      case 'single':
        return(<Single navigator={navigator} {...route.passProps} />);
      case 'profile':
        return(<Profile navigator={navigator} />);
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
