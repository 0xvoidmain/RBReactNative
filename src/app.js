import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';

import {
  observer,
  inject
} from 'mobx-react/native';

import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import AuthStore from './stores/auth';
import FloatingLayer from './components/FloatingLayer';
import * as flc from './helpers/floatingLayerControl';

console.ignoredYellowBox = ['Warning: BackAndroid'];

@observer
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Navigation = StackNavigator({
      Home: { screen: HomeScreen },
      Profile: { screen: ProfileScreen }
    }, {
      initialRouteName: 'Home',
      headerMode: 'float'
    });

    return AuthStore.isLogin ?
      <View style={{width: '100%', height: '100%'}}>
        <Navigation />
        <FloatingLayer ref={e => flc.init(e)} />
      </View> :
      <LoginScreen />;
  }
}