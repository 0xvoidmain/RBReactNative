import React from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  Easing,
  PanResponder
} from 'react-native';

import { observer } from 'mobx-react/native';
import { observable } from 'mobx';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const rwh = deviceWidth / deviceHeight;
const ratio = 1.5;

const minWidth = Math.round(deviceWidth / 4);
const minHeight =  Math.round(minWidth * ratio) + 10;
const minTop = deviceHeight - minHeight;
const minLeft = deviceWidth - minWidth;

export default class FloatingLayer extends React.Component {
  state = {
    visible: false,
    minimal: false,
    resizing: false,
    opacity: new Animated.Value(0),
    top: new Animated.Value(deviceHeight),
    left: new Animated.Value(0),
    right: new Animated.Value(0),
    bottom: new Animated.Value(-deviceHeight),
    width: new Animated.Value(deviceWidth),
    height: new Animated.Value(deviceHeight),
  }
  minimal = false;
  childComponent = null;

  static instance = null;
  static getInstance() {
    return FloatingLayer.instance;
  }

  constructor(props) {
    super(props);
    FloatingLayer.instance = this;
  }

  componentDidMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.handleResponder(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.handleRelease(evt, gestureState)
      },
    });
  }

  isMinimal() {
    return this.state.minimal;
  }

  close(type) {
    if (type == 'swipe') {
      Animated.parallel([
        Animated.spring(this.state.left, { toValue: -minWidth - 50, duration: 300 } ),
        Animated.spring(this.state.right, { toValue: deviceWidth + 50, duration: 300 } ),
        Animated.timing(this.state.opacity, { toValue: 0, duration: 300 } )
      ]).start();
    }
    else {
      Animated.timing(this.state.opacity, { toValue: 0, duration: 300 } ).start();
    }

    setTimeout(() => {
      this.setState({
        visible: false,
        minimal: false
      });
    }, 300);
  }

  show(e) {
    if (this.isMinimal()) {
      Animated.parallel([
        Animated.timing(this.state.top, { toValue: 0, duration: 300 } ),
        Animated.timing(this.state.left, { toValue: 0, duration: 300 } ),
        Animated.timing(this.state.bottom, { toValue: 0, duration: 300 } ),
        Animated.timing(this.state.right, { toValue: 0, duration: 300 } )
      ]).start();
    }
    else {
      this.state.top.setValue(deviceHeight);
      this.state.left.setValue(0);
      this.state.bottom.setValue(-deviceHeight);
      this.state.right.setValue(0);
      this.state.opacity.setValue(0);
      Animated.parallel([
        Animated.timing(this.state.top, { toValue: 0, duration: 300 } ),
        Animated.timing(this.state.bottom, { toValue: 0, duration: 300 } ),
        Animated.timing(this.state.opacity, { toValue: 1, duration: 300 } )
      ]).start();
    }
    this.childComponent = e;
    this.setState({
      visible: true,
      minimal: false
    });
  }

  maximize() {
    this.setState({
      minimal: false
    });
    Animated.parallel([
      Animated.spring(this.state.bottom, { toValue: 0, duration: 300 } ),
      Animated.spring(this.state.right, { toValue: 0, duration: 300 } ),
      Animated.spring(this.state.top, { toValue: 0, duration: 300 } ),
      Animated.spring(this.state.left, { toValue: 0, duration: 300 } )
    ]).start();
  }

  minimize() {
    this.setState({
      minimal: true
    });
    Animated.parallel([
      Animated.spring(this.state.bottom, { toValue: 5, duration: 300 } ),
      Animated.spring(this.state.right, { toValue: 5, duration: 300 } ),
      Animated.spring(this.state.top, { toValue: minTop, duration: 300 } ),
      Animated.spring(this.state.left, { toValue: minLeft, duration: 300 } )
    ]).start();
  }

  location = null
  GUIState = null
  swipeToClose = null;
  leftClose = null;
  handleResponder = (e) => {
    if (!this.state.resizing) {
      this.setState({
        resizing: true
      })
    }
    if (!this.GUIState) {

      this.GUIState = this.isMinimal() ? {
        top: minTop,
        left: minLeft,
        width: minWidth,
        height: minHeight
      } : {
        top: 0,
        left: 0,
        width: deviceWidth,
        height: deviceHeight
      }
    }

    var t = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY
    };
    var p = this.location;
    if (p) {
      var dx = t.x - p.x;
      var dy = t.y - p.y;
      if (Math.abs(dy) > Math.abs(dx) && !this.swipeToClose) {
        if (this.GUIState.top > 0 || dy > 0) {
          this.GUIState.top += dy;
          this.GUIState.left += (dy / ratio) / 1.3;

          this.state.top.setValue(Math.round(this.GUIState.top));
          this.state.left.setValue(Math.round(this.GUIState.left));

          this.swipeToClose = false;
        }
      }
      else if (this.isMinimal() && (this.swipeToClose == null || this.swipeToClose)) {
        if (this.leftClose == null) {
          this.leftClose = minLeft;
        }
        this.leftClose += dx;
        if (minLeft - this.leftClose > 10) {
          this.swipeToClose = true;
        }
        this.state.left.setValue(Math.round(this.leftClose));
        this.state.right.setValue(deviceWidth - Math.round(this.leftClose) - minWidth);
      }

      this.location.x = t.x;
      this.location.y = t.y;
    }
    else {
      this.location = {
        x: t.x,
        y: t.y
      }
    }

  }

  handleRelease = (e, g) => {
    if (this.GUIState && !this.swipeToClose) {
      if (this.isMinimal()) {
        if (this.GUIState.top < 3/4 * deviceHeight || g.vy <= -0.6) {
          this.maximize();
        }
        else {
          this.minimize();
        }
      }
      else {
        if (this.GUIState.top > deviceHeight / 4 || g.vy >= 0.6) {
          this.minimize();
        }
        else {
          this.maximize();
        }
      }
    }

    if (this.swipeToClose) {
      if (this.leftClose < deviceWidth / 3 || g.vx <= -0.6) {
        this.close('swipe');
      }
      else {
        this.minimize();
      }
    }

    setTimeout(() => {
      this.setState({
        resizing: false
      })
    }, 200);

    this.location = null;
    this.swipeToClose = null;
    this.leftClose = null;
    this.GUIState = null;
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return <Animated.View {...this._panResponder.panHandlers}
      style={{
        backgroundColor: this.state.minimal || this.state.resizing ? 'transparent' : 'black',
        position: 'absolute',
        opacity: this.state.opacity,
        top: this.state.top,
        left: this.state.left,
        right: this.state.right,
        bottom: this.state.bottom
      }}>
      {this.childComponent}
    </Animated.View>
  }
}