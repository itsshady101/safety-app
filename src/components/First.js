import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, StyleSheet, Image } from 'react-native';

export default class First extends React.Component{
  navSecond(){
    this.props.navigator.push({
      id: 'second'
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar}
                        title={this.props.title}
                        titleColor={'#FFFFFF'}/>
        <TouchableHighlight onPress={this.navSecond.bind(this)}>
          <Text>Navigate to second screen</Text>
        </TouchableHighlight>
      </View>
    );
  }
};
