import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Animated
} from 'react-native';
import Video from 'react-native-video';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import * as flc from '../helpers/floatingLayerControl';
import FloatingLayer from './FloatingLayer';

@observer
export default class AnswerPlayer extends React.Component {

  @observable isLoadingVideo = true;

  imgUrl() {
    return get(this.props.video, 'urls.origin');
  }

  controlLayer = () => {
    if (FloatingLayer.getInstance().isMinimal()) {
      FloatingLayer.getInstance().close();
    }
    else {
      FloatingLayer.getInstance().minimize();
    }
  }

  render() {
    const video = this.props.video;
    return <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <Image source={{uri: video.urls.thumbnail}} style={styles.thumbnail} />
      <Video
        source={{uri: video.urls.origin}}
        style={styles.video}
        resizeMode='cover'
        ignoreSilentSwitch='ignore'
        onBuffer={()=> this.isLoadingVideo = false}
        />
      {this.isLoadingVideo &&
        <ActivityIndicator color='#fff' animating={true} size='small' style={styles.indicator}/>
      }
      <TouchableOpacity style={styles.closeBtn} onPress={this.controlLayer}>
        <Image source={require('../imgs/icon-close.png')} style={styles.closeImg} />
      </TouchableOpacity>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    // backgroundColor: 'black'
  },
  video: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    top: 20,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute'
  },
  closeBtn: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 20,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeImg: {
    width: 13,
    height: 13
  },
  thumbnail: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    top: 20,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute'
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    width: '100%'
  }
});