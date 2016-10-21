import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    DrawerLayoutAndroid,
    ToolbarAndroid,
    TouchableOpacity
} from 'react-native';

import general from './../general/mainStyle';
import data from './../data';
import Icon from 'react-native-vector-icons';

const width = Dimensions.get('window').width;

export default class News extends Component {
    constructor() {
        super();
        this.data = data;
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
        
        
        let nab = (
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

            <View style={{flex: 1, backgroundColor: '#fff'}}>
            <ToolbarAndroid
              title={"ASAP"}
              titleColor={'#fff'}
              style={{ height: 50, backgroundColor: '#34314c', elevation: 5}}
              navIcon={require('./../images/arrows_left.png')}
              onIconClicked={()=> this.props.navigator.pop()}
            />

            <ScrollView style={[general.container]}> 
                {this.data.map(function(kkk,i) {
                    var index = i;
                    return (
                    <TouchableOpacity key={i} onPress={
                        function(props, i){
                            this.props.navigator.push({id: 'single', passProps: {idd: index, kill: "me"} 
                            })
                        }.bind(this)
                    }>
                        <Article heading={kkk.title} content={kkk.content.slice(0,100)} />
                    </TouchableOpacity>
                    )
                }.bind(this))}
            </ScrollView>
            </View>
        );
    }
}

class Article extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row', width: width-20, backgroundColor: '#eee', padding: 10, margin: 10, elevation: 2}}>
                <Image source={require('./../images/man.png')} style={{resizeMode: 'contain', width: 100,}}/>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Text style={[]}>{this.props.title}</Text>
                    <Text style={[{width: width/2, fontSize: 18, textAlign: 'right'}, general.brandon]}>
                        {this.props.content}
                    </Text>  
                </View>
            </View>
        );
    }
}
