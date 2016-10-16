import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    AsyncStorage,
    StyleSheet
} from 'react-native';
import Button from './../components/Button';
import {q, db} from './../firebaseConfig.js';
import general from './../general/mainStyle'
export default class AddParent extends Component {
    
    constructor() {
        super();
        this.state= {
            idToFind: '',
            done: false,
            found: {
                name: 'Add the id',
                email: ''
            },
            user: {
            }
        }

        

        AsyncStorage.getItem('@superStore:user', (err, result) => {
            this.setState({user: JSON.parse(result)});
            //alert(result);
        });
        this.parentEmails = [];
        this.parentNames = [];
    }
    
    find() {
        let db = q.database();
        db.ref('/users/' + this.state.idToFind + '/').once('value').then((snapshot) => {
            this.setState({found: snapshot.val()});
            this.setState({done: true});
           // alert(this.state.found.email);
        });
    
    }
    
    addParent() {
        const uid = this.state.idToFind;
        const loggedInAs = this.state.user.uid;
        db.ref('users/' + loggedInAs + '/parent/' + uid + '/').set({
            added: true
        });
        db.ref('users/' + uid + '/child/' + loggedInAs + '/').set({
            added: true
        });
    
    }
    componentWillMount() {
        const loggedInAs = this.state.user.uid;

        var parentIds = [];
        db.ref('/users/' + loggedInAs + '/parent/').once('value', (snapshot) => {
            var obj = snapshot.val();
            parentIds = Object.keys(obj);
            var emails = [];
            var names = [];
            db.ref('/users/').once('value', (snapshot) => {
                var snapObj = snapshot.val();
                // alert(parentIds.length);
                parentIds.forEach((id) => {
                    emails.push(snapObj[id].name);
                    names.push(snapObj[id].email);
                })
                this.names = names;
                this.emails = emails;

                alert(this.names.length + this.emails.length);
            })
        })

    }

    render() {
        return (
            <View style={general.container}>
                <View style={general.content}> 
                    <Text style={[general.heading, general.brandon, general.heading1]}>YO! BOI!</Text>
                    <TextInput placeholder={"Add id."} onChangeText={(text) => this.setState({idToFind: text})} />
                    <Button onPressButton={this.find.bind(this)}>Find</Button>

                   
                    {<UserCard user={this.state.found} add={this.addParent.bind(this)} />}
                    <Text>{this.parentNames.length}</Text>
                </View>
            </View>
        )
    }
}

class UserCard extends Component {
    render() {
        return (
            <View style={{margin: 20, padding: 30, elevation: 6, backgroundColor: '#fff'}}>
                <Text style={[general.brandon, general.heading, general.heading2, {marginTop:0, marginBottom:0}]}>
                    {this.props.user.name}
                </Text>
                <Text style={[general.brandon, general.heading]}>
                    {this.props.user.email}
                </Text>
                <Button onPressButton={this.props.add} btnStyle={[general.button, general.blue]} >Add</Button>
            </View>
        )
    }
}
