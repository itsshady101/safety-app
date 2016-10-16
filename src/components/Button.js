import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPressButton} activeOpacity={0.8}>
        <Text style={[this.props.btnStyle, {overflow: 'hidden'}]}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    )
  }
}
