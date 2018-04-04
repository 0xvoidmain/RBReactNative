import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';

class AuthStore {
  @observable isLogin = false;
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1OGYwOTYzMGNlMGMyNzAwMTBmODA5YjgiLCJpYXQiOjE0OTQzMTU3NzQsImV4cCI6MTQ5NTE3OTc3NH0.Me-fu2AN0dhvGwwMBeU9Fqbjq6JviDd8o7d09c-ehmA';
  constructor() {
    this.loadStorage();
  }

  async loadStorage() {
    this.token = await AsyncStorage.getItem('token') || this.token;
    if (this.token) {
      this.isLogin = true;
    }
  }

  login() {
    this.isLogin = true;
    if (this.token) {
      AsyncStorage.setItem('token', this.token);
    }
  }

  logout() {
    this.isLogin = false;
    AsyncStorage.removeItem('token');
  }
}

export default new AuthStore();