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
            user: '',
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
        
        var data = {
            lon: this.state.lon,
            lat: this.state.lat,
            user: this.state.user.uid,
            name: this.state.user.name,
            message: this.state.msg,
        }
        alert(JSON.stringify(data));
        this.setState({sent: true, msg: ''});
        var key = db.ref().child('timeline').push().key;

        db.ref('/timeline/' + key + '/').update(data);
    }
    
    renderButton() {
        if(this.state.sent) {
            return (<Text>Alert Sent</Text>);
        } else {
            return (<Button btnStyle={[general.button, general.blue, {backgroundColor: 'red', textAlign: 'center'}]} onPressButton={this.sendLocation.bind(this)}><Icon name="exclamation-circle" color="#fff" size={15} style={{marginRight: 15}} />  Alert</Button>);
        }
    }

    render() {
    
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>
        );
        return (
            <ScrollView style={general.container}>
             
                { /*
                <DrawerLayoutAndroid
                  drawerWidth={300}
                  statusBarBackgroundColor={'#333'}
                  drawerPosition={DrawerLayoutAndroid.positions.Right}
                  renderNavigationView={() => navigationView}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
                  </View>
                </DrawerLayoutAndroid>
                */}

                <Header>Welcom</Header>
                <View style={[general.content, ]}>
                    <Text style={[general.brandon, general.heading, general.heading2]}>Be Safe</Text>
                    <TextInput placeholder={"Enter any message..."} onChangeText={(msg) => this.setState({msg})} />

                    {this.renderButton()}

                </View>
            </ScrollView>
           
        )
    }
}
