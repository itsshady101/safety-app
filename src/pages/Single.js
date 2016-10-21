import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import general from './../general/mainStyle';
import data from './../data';

const width = Dimensions.get('window').width;

export default class Single extends Component {
    constructor() {
        super();

    }
    componentWillMount() {
        var lll = this.props.idd; 
        this.data = data[lll];
        //alert(this.props.idd);
    }
    render() {
        return (
            <ScrollView style={[general.container,]}> 
                <Image source={require('./../images/k.jpg')} style={{resizeMode: 'cover', width: width, height: 300}}>
                    <Text style={[general.brandon, general.heading, general.heading1, {color: '#fff', position: 'absolute', bottom: 20, left: 20}]}>{this.data.title}</Text>
                </Image>
                <View style={{flexDirection: 'column', padding: 20, backgroundColor: '#fff'}}>
                    <Text>{this.props.id}</Text>
                    <Text style={[{width: width-40, fontSize: 18}, general.brandon]}>
                        {this.data.content}
                    </Text>  
                </View>
            </ScrollView>
        );
    }
}
