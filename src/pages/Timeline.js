import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    AsyncStorage,
    ToolbarAndroid,
    DrawerLayoutAndroid,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import MapView from 'react-native-maps';
import {q, db} from './../firebaseConfig';
import Card from './../components/Card';
import general from './../general/mainStyle';
const width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Timeline extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            user: {},
            childIds: []
        }
    }
    componentDidMount() {

    }


    componentWillMount() {
        db.ref('/timeline/').on('value', (snapshot) => {
            var data = [];
            for(item in snapshot.val()) {
                data.unshift(snapshot.val()[item]);
            }
            this.setState({posts: data});
        });
        AsyncStorage.getItem('@superStore:user', (err, data) => {
            var uid = '';
            this.setState({user: JSON.parse(data)}, () => uid=this.state.user.uid);
         //       alert(this.state.user.uid);
            db.ref('/users/' + uid + '/child/').once('value', (snapshot) => {

                var obj = snapshot.val();
                if(obj) {
                var childIds = Object.keys(obj);
                this.setState({childIds});
                }
            })
        });
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

                <View style={{}, general.padding}>
                    <TouchableOpacity onPress={() => this.props.navigator.push({id: 'add'})}><Text style={[{fontSize: 20}, general.brandon]}><Icon name="user" size={23} color="#777" />  Profile</Text></TouchableOpacity>
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

            <View style={{flex: 1}}>
            <ToolbarAndroid
              title={"ASAP"}
              titleColor={'#fff'}
              style={{ height: 50, backgroundColor: '#34314c', elevation: 5}}
              navIcon={require('./../images/menu.png')}
              onIconClicked={()=> this.refs['DRAWER'].openDrawer()}
            />


            <ScrollView style={[general.container, { width: width, backgroundColor: '#f7f7f7'}]}>

                <Text style={[{paddingLeft: 20, paddingRight:20, paddingTop: 3, paddingBottom: 3}, general.brandon, general.heading, general.heading1]}>Timeline: These people need help</Text>
                {this.state.posts.map(function(data, i){
                    var SAMPLE_REGION = {
                      latitude: data.lat,
                      longitude: data.lon,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0420
                    };
                    var LatLng = {
                        latitude: data.lat,
                        longitude: data.lon
                    };
                    var blah = {
                        title: "I'm here"
                    }
                    return (
                    <Card lat={data.lat} lon={data.lon} message={data.message} name={data.name} key={i}>
                    <MapView
                        initialRegion={SAMPLE_REGION}
                        style={{
                            height: 100
                        }}
                    >
                        <MapView.Marker
                            coordinate={LatLng}
                            title={blah.title}
                        />
                    </MapView>
                    </Card>
                    );
                })}

            </ScrollView>
            </View>
            </DrawerLayoutAndroid>
        )
    }
}
