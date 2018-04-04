'use strict';

const React = require('React');
const {
  Image,
  Button,
  View,
  StyleSheet,
  StatusBar,
  Alert,
  TextInput,
  KeyboardAvoidingView
} = require('react-native');

import AuthStore from '../stores/auth';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

@observer
export default class Login extends React.Component {
  @observable showInputToken = false;
  @observable input = '';

  handleLogin = () => {
    if (this.showInputToken) {
      AuthStore.token = this.input;
      AuthStore.login();
    }
    else {
      this.showInputToken = true;
    }
  }

  render() { return (
    <View style={styles.screen}>
      <StatusBar barStyle='light-content' />
      <Image source={require('../imgs/login-background.png')} style={styles.imageBg} >
        <View style={styles.logoContainer}>
          <Image source={require('../imgs/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.actionContainer}>
          {this.showInputToken &&
            <KeyboardAvoidingView>
              <TextInput placeholder='Enter your token'
                value={this.input}
                onChangeText={e => this.input = e}
                style={styles.input} />
            </KeyboardAvoidingView>
          }
          <Button title='Login' onPress={this.handleLogin} />
        </View>
      </Image>
    </View>
  )}
}

var styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#222222'
  },
  imageBg: {
    width: '100%',
    height: '100%'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2
  },
  actionContainer: {
    flex: 1,
    padding: 10
  },
  logo: {
    width: 150,
    resizeMode: 'contain'
  },
  input: {
    height: 40,
    backgroundColor: '#fff'
  }
})