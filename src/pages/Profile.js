import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ToolbarAndroid,
    DrawerLayoutAndroid,
    Dimensions
} from 'react-native';

import {q, db} from './../firebaseConfig';
import general from './../general/mainStyle';
import Icon from 'react-native-vector-icons';
const width = Dimensions.get('window').width;

import Button from './../components/Button';

export default class Profile extends Component {
    
    constructor() {
        super();
        this.state = {
            user: {},    
            value: ''
        }
    }
    
    componentDidMount() {
        AsyncStorage.getItem('@superStore:user', (err, result) => {
            if (result) {
                let user = JSON.parse(result);
                this.setState({user});
            }
        })
    }

    signOut() {
      AsyncStorage.removeItem('@superStore:user', (error) => {
          if(error) {
              alert(error);
          }
      })
      this.props.navigator.immediatelyResetRouteStack([{id: 'splash'}]);
    }

    saveName() { 
        //alert(this.state.value);
        var user = q.auth().currentUser;
        if(user) {
            user.updateProfile({
                displayName: this.state.value
            });
        }
        var data = {
            loggedIn: true,
            id: user.uid,
            name: this.state.name,
            email: user.email
        }
        this.state.user.name = this.state.value;
        AsyncStorage.setItem('@superStore:user', JSON.stringify(user));
        alert('DisplayName Changed');
        let uid = this.state.user.id;
        let name = this.state.value;
        db.ref('/users/').child(uid).update({name});
    }

    render() {

        return(


            <View style={{flex: 1}}>
            <ToolbarAndroid
              title={"ASAP"}
              titleColor={'#fff'}
              style={{ height: 50, backgroundColor: '#34314c', elevation: 5}}
              navIcon={require('./../images/arrows_left.png')}
              onIconClicked={()=> this.props.navigator.pop()}
            />

            <View style={[general.container, general.content, general.padding, ]}>

                <Text style={[general.heading, general.brandon, general.heading2]}>Your Unique Id:<Text style={{fontWeight: 'bold'}}> {this.state.user.id}</Text></Text>        
                <TextInput placeholder={this.state.user.name} value={this.state.value} onChangeText={(value) => this.setState({value})}/>
            <Button btnStyle={[general.button]} onPressButton={this.saveName.bind(this)}>Change Display Name</Button>
            </View>

            </View>

        );
    }
}
