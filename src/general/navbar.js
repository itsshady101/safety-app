import React from 'react';
import {
    View, 
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import general from './mainStyle.js';

var navMenu = (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{}, general.padding}>
            <TouchableOpacity onPress={() => this.props.navigator.push({id: 'timeline'})}><Text style={[{fontSize: 20}, general.brandon]}><Icon name="home" size={23} color="#777" />   Home</Text></TouchableOpacity>
        </View>
        <View style={{}, general.padding}>
            <TouchableOpacity onPress={() => this.props.navigator.push({id: 'help'})}><Text style={[{fontSize: 20}, general.brandon]}><Icon name="exclamation-triangle" size={23} color="#777" />   Alert</Text></TouchableOpacity>
        </View>

        <View style={{}, general.padding}>
            <TouchableOpacity onPress={() => this.props.navigator.push({id: 'add'})}><Text style={[{fontSize: 20}, general.brandon]}><Icon name="user-plus" size={23} color="#777" />  Add Another Guardian</Text></TouchableOpacity>
        </View>
        
        <View style={general.padding}>
            <TouchableOpacity onPress={() => this.props.navigator.push({id: 'news'})}><Text style={[{fontSize: 20}, general.brandon]}><Icon name="newspaper-o" size={23} color="#777" />  News and Alerts</Text></TouchableOpacity>
        </View>

        <View style={general.padding}>
            <TouchableOpacity onPress={() => this.props.navigator.push({id: 'signout'})}><Text style={[{fontSize: 20}, general.brandon]}><Icon name="sign-out" size={23} color="#777" />  Logout</Text></TouchableOpacity>
        </View>

    </View>
);
export default navMenu;
