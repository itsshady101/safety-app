import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    AsyncStorage,
    StyleSheet
} from 'react-native';

import MapView from 'react-native-maps';
import {q, db} from './../firebaseConfig';
import Card from './../components/Card';
import general from './../general/mainStyle';
const width = Dimensions.get('window').width;

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
                var childIds = Object.keys(obj);
                this.setState({childIds});
            })
        });
    }

    render() {
        return (
            <ScrollView style={[general.container, { width: width, backgroundColor: '#FFFFF3'}]}>
                  
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
        )
    }
}


