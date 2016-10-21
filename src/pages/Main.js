import React, {Component} from 'react';
import {
    Text,
    View,
    Stylesheet,
    AsyncStorage,
    Image
} from 'react-native';

import general from './../general/mainStyle';

export default class Main extends Component {
    constructor() {
      super(); 
    }
    
    componentWillMount() {
        AsyncStorage.getItem('@superStore:user', (err, result) => {
                let user = JSON.parse(result);
                if (user && user !== null) {
                    this.props.navigator.replace({id: 'timeline'});
                } else {
                    this.props.navigator.replace({id: 'splash'});
                }
        })
    }
    
    render() {
      return(
        <View style={[general.container, { backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center' }]}>
            
            <Image source={require('./../images/logo.png')} style={{resizeMode:'contain', height: 300}} />


        </View>
      )
   }
}
