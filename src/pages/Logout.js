import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage,
} from 'react-native';

import {q, db} from '../firebaseConfig';

export default class Logout extends Component {
    constructor() {
        super();
        AsyncStorage.removeItem('@superStore:user', (error) => {
            if(error) {
                alert(error);
            }
            alert(1);
        })
        this.props.navigator.immediatelyResetRouteStack([{id: 'splash'}]);
    }
    componentWillReceiveProps(props) {
        AsyncStorage.removeItem('@superStore:user', (error) => {
            if(error) {
                alert(error);
            }
            alert(1);
        })
        this.props.navigator.replace({id: 'splash'});
    }
    render() {
        return (
            <Text>Logging out...</Text>
        )
    }
}
