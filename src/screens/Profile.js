'use strict';

const React = require('React');
const {
  Image,
  Button,
  View
} = require('react-native');

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() { return (
    <View style={{flex: 1, backgroundColor: '#222222'}}>
      <Image source={require('../imgs/login-background.png')}
        style={{width: '100%', height: '100%'}}>
      </Image>
    </View>
  )}
}