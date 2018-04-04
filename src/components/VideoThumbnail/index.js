import React from 'react';

import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import deep from 'deep-obj';
import $ from '../../styles/core';
import AnswerPlayer from '../AnswerPlayer';
import * as flc from '../../helpers/floatingLayerControl';

export default class VideoThumbnail extends React.Component {
  imgUrl() {
    return get(this.props.video, 'urls.thumbnail');
  }

  playVideo = () => {
    flc.show(<AnswerPlayer video={this.props.video} />);
  }

  render() {
    const video = this.props.video;
    const style = this.props.style;
    if (!video) return null;
    return <TouchableOpacity style={style} onPress={this.playVideo}>
      <Image source={{uri: video.urls.thumbnail}}
        style={[styles.img, $.alignCenter, $.justifyCenter]}>
        <Image source={require('./icon-play.png')} style={styles.btnPlay} />
      </Image>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  img: {
    height: 125,
    resizeMode: 'cover',
    borderRadius: 4,
    width: '100%'
  },
  btnPlay: {
    resizeMode: 'contain',
    height: 40,
    width: 40
  }
})