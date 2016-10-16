import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, StyleSheet, Image } from 'react-native';

export default class Second extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar}
                        title={this.props.title}
                        navIcon={require('image!ic_arrow_back_white_24dp')}
                        onIconClicked={this.props.navigator.pop}
                        titleColor={'#FFFFFF'}/>
        <Text>
          Second screen
        </Text>
      </View>
    );
  }
};
