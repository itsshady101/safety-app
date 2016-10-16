import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    DrawerLayoutAndroid,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const AvatarIcon = (<Icon name="user" size={100} color="#fff" />);
const menuIcon = (<Icon name="bars" size={20} color="#fff" />);

const width = Dimensions.get('window').width; // Full height of the window

export default class Header extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Image source={require('../images/bg.jpg')} style={styles.hero}>

                <TouchableHighlight style={{position: 'absolute', top:20, left: 20}} onPress={()=> this.refs['DRAWER_REF'].openDrawer()}>{menuIcon}</TouchableHighlight>
                <View style={styles.content}>
                    {AvatarIcon}
                    <Text style={styles.heading2}>Welcome, {this.props.children}</Text>
                    
                </View>

            </Image>
        )
    }

}

const styles = StyleSheet.create({
    hero: {
        height: 300,
        alignItems: 'center'
    },
    content: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        height: 300,
        alignSelf: 'stretch',
        width: width
    },
    avatar: {
        resizeMode: 'contain',
        height: 100
    },
    heading2: {
        color: '#fff',
        fontSize: 25,
        marginTop: 30,
        marginBottom: 30,
        fontFamily: 'brandon'
    },  
});
