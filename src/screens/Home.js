'use strict';

const React = require('React');
const {
  Image,
  Button,
  View,
  FlatList,
  Text,
  VirtualizedList
} = require('react-native');

import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import Screen from '../components/Screen';
import AuthStore from '../stores/auth';
import UserLabel from '../components/UserLabel';
import $ from '../styles/core';
import VideoThumbnail from '../components/VideoThumbnail';
import QAItem from '../components/QAItem';

@observer
export default class Home extends Screen {
  static navigationOptions = {
    title: 'Home',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTitle: <Image source={require('../imgs/logo-color.png')} style={{height: 25, width: 100, resizeMode: 'contain'}} />
  }

  stopLoadData = false;
  @observable questions = []

  componentDidMount() {
    this.loadQuestions();
  }

  async loadQuestions() {
    if (this.stopLoadData) {
      return;
    }
    var url = 'https://tomoapp.vn/api/v1/feeds/list';
    if (this.questions.length > 0) {
      url += '?limit=20&createdAt=' + new Date(this.questions[this.questions.length - 1].createdAt).toISOString();
    }
    var data = await fetch(url, {
      headers: {
        Authorization: AuthStore.token
      }
    });
    var q = await data.json();
    console.log(q);
    this.questions = this.questions.concat(q.rows.map(e => e.data.question).filter(e => e.answer && e.content));
    if (q.length < 20) {
      this.stopLoadData = true;
    }
  }

  avatar(user) {
    if (user.avatar && user.avatar.urls && user.avatar.urls.t200x200) {
      return user.avatar.urls.t200x200;
    }
    return `https://graph.facebook.com/${user.facebookId}/picture?type=normal`;
  }

  render() { return (
    <View style={{flex: 1}}>
      <VirtualizedList
        data={this.questions}
        keyExtractor={e => e._id}
        onEndReached={() => this.loadQuestions()}
        renderItem={({item}) => <QAItem data={item} />}
      />
    </View>
  )}
}