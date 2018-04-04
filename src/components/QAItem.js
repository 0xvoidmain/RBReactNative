import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import UserLabel from './UserLabel';
import VideoThumbnail from './VideoThumbnail';
import $ from '../styles/core';

export default class QAItem extends React.Component {
  render() {
    const data = this.props.data;

    return <View style={styles.container}>
      <View style={[$.row, $.justifyBetween, $.alignStart]}>
        <UserLabel user={data.answer.user} style={$.mb15} />
        <Button title='···' color='black' onPress={() => {}} />
      </View>
      <View style={[{flex: 1}, $.row]}>
        <View style={[{flex: 7}, $.pr5]}>
          <Text style={$.mb5}>
            {data.content.trim()}
            <Text style={$.subText}>&nbsp;-&nbsp;</Text>
            <UserLabel user={data.user} type='inline' style={$.subText}/>
          </Text>
        </View>
        <VideoThumbnail video={data.answer.video} style={{flex: 3}}/>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    paddingTop: 10
  }
})