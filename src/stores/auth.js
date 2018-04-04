import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';

class AuthStore {
  @observable isLogin = false;
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1OGYwOTYzMGNlMGMyNzAwMTBmODA5YjgiLCJwaG9uZSI6IiIsImlhdCI6MTUyMjgxNzU4NSwiZXhwIjoxNTI4MDAxNTg1fQ.TD6RZmmZtiSkNI4kGCwgDQ2LuaLx0OI5PL64RDFz9Mg';
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