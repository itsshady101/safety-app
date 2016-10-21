import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput, 
    Image,
    AsyncStorage,
    ScrollView,
    Dimensions,
    DrawerLayoutAndroid,
    TextView,
    TouchableOpacity,
    ToolbarAndroid,
    Navigator
} from 'react-native';

import general from './../general/mainStyle';
import Button from './../components/Button';
import Header from './../components/Header';
import { q, db } from './../firebaseConfig.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
export default class Help extends Component {

    constructor() {
        super();
        this.state = {
            user: {}, 
            lat: '',
            lon: '',
            msg: "I'm in danger",
            sent: false
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('@superStore:user', (err, data) => {
            if (data) {
                let user = JSON.parse(data);
                this.setState({user});
            }
        })

        navigator.geolocation.getCurrentPosition(
            (position) => {
                // data.long = position.coords.longitude;
                this.setState({lon: position.coords.longitude, lat: position.coords.latitude});
                // data.lat = position.coords.latitude;
            }
        );  
    }

    sendLocation() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.setState({lon: position.coords.longitude, lat: position.coords.latitude});

            var data = {
                lon: this.state.lon,
                lat: this.state.lat,
                user: this.state.user.id,
                name: this.state.user.name,
                message: this.state.msg,
            }
            //alert(JSON.stringify(data));
            this.setState({sent: true, msg: ''});
            var key = db.ref().child('timeline').push().key;

            db.ref('/timeline/' + key + '/').update(data);
        });
    }
    componentDidMount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    
    renderButton() {
        if(this.state.sent) {
            return (<Text>Your Location is been tracken quit to stop tracking.</Text>);
        } else {
            return (<Button btnStyle={[general.button, general.blue, {backgroundColor: 'red', textAlign: 'center'}]} onPressButton={this.sendLocation.bind(this)}><Icon name="exclamation-circle" color="#fff" size={15} style={{marginRight: 15}} />  Alert</Button>);
        }
    }

    
    signOut() {
      AsyncStorage.removeItem('@superStore:user', (error) => {
          if(error) {
              alert(error);
          }
      })
      this.props.navigator.immediatelyResetRouteStack([{id: 'splash'}]);
    }

    render() {
    
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
                    <TouchableOpacity onPress={this.signOut.bind(this)}><Text style={[{fontSize: 20}, general.brandon]}><Icon name="sign-out" size={23} color="#777" />  Logout</Text></TouchableOpacity>
                </View>

            </View>
        );

        return (
        <DrawerLayoutAndroid
          drawerWidth={width * 0.65}
          ref='DRAWER'
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => { return(navMenu)}}>

            <ToolbarAndroid
              title="ASAP"
              titleColor={"#fff"}
              style={{ height: 50, backgroundColor: '#34314c', elevation: 5}}
              navIcon={require('./../images/menu.png')}
              onIconClicked={()=> this.refs['DRAWER'].openDrawer()}
              />
            <ScrollView style={[general.container, {backgroundColor: '#fff'}]}>
             
                <Header>{this.state.user.name}</Header>
                <View style={[general.content, {backgroundColor: '#fff'}]}>
                    <Text style={[general.brandon, general.heading, general.heading2]}>Be Safe</Text>
                    <TextInput placeholder={this.state.msg} value={this.state.msg} onChangeText={(msg) => this.setState({msg})} />
                    <Text>{this.state.lan} {this.state.lon} </Text>

                    {this.renderButton()}

                </View>
            </ScrollView>
        </DrawerLayoutAndroid>   
        )
    }
}
