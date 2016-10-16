import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';

import Button from './Button';
import general from './../general/mainStyle';

export default class Card extends Component {

    render() {
        return (
            <View style={{elevation: 10,marginLeft: 10,marginRight: 10, backgroundColor: '#fff', marginBottom: 25, borderRadius: 5}}>
                <View style={{position: 'relative'}}>{this.props.children}</View>
                <View style={{paddingRight: 20, paddingLeft: 20, paddingTop: 10, paddingBottom: 10}}>
                    <Text style={[{fontSize: 18, marginTop: 4, marginBottom: 4}, general.brandon]}>{this.props.message}</Text>
                    <Text style={[{}, general.brandon]}>{this.props.name}</Text>
                </View>

            </View>
        )
    }
}
