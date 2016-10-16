import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Navigator,
    ScrollView,
    Dimensions,
    AsyncStorage
} from 'react-native';
import MapView from 'react-native-maps';
import Button from '../components/Button';
import Header from '../components/Header';

const width = Dimensions.get('window').width; // Full height of the window

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
        initialPosition: '',
        longitude:12 ,
        latitude: 12,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
    this.user = 'll';
  }
  


  killme() {
    alert(this.user);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            let initialPosition = JSON.stringify(position);
            this.setState({initialPosition,longitude: long, latitude: lat});
        },
        (error) => alert(JSON.stringify(error))
    );  
   AsyncStorage.getItem('@superStore:user', (err, data) => {
       if (data) {
           // this.user = JSON.parse(data);
           this.user = JSON.parse(data);
       }
    });
  }
  render() {
    return (
        <ScrollView style={styles.container}>
            <Header bg={'../images/bg.jpg'}>
                {this.user.name}
            </Header> 
            <Text style={{padding: 8, fontSize: 10}}>Code {this.user.email}</Text>
            <Button onPressButton={() => this.props.navigator.push({id:'add'}) }>Ad Parent</Button>
            <View style={styles.main_container}>
                <Text style={styles.heading1}>Last Locations</Text>
                <View style={styles.card}>
                    <Text style={styles.card_content}>
                        Last Seen: Street 101, Newplace
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
    heading1: {
        marginTop: 20,
        marginBottom: 20,
        fontFamily: 'brandon',
        fontSize: 30
    },
    main_container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    card: {
        elevation: 9,
        marginBottom: 10,
        backgroundColor: 'white',
        flex: 1
    },
    card_content: {
        padding: 10
    }
});
