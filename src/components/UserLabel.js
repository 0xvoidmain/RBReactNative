import React from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import deep from 'deep-obj';
import { facebookAvatarUrl } from '../helpers';

export default class UserLable extends React.PureComponent {

  // static propTypes = {
  //   user: React.PropTypes.object,
  //   type: React.PropTypes.string,
  //   style: React.PropTypes.object,
  //   styleName: React.PropTypes.object,
  //   styleHeadline: React.PropTypes.object,
  //   hiddenAvatar: React.PropTypes.bool
  // }

  avatar() {
    const user = this.props.user;
    var url = deep.get(user, 'avatar.urls.t200x200');
    return url || facebookAvatarUrl(user.facebookId);
  }

  render() {
    var type = this.props.type || 'normal';
    var user = this.props.user;
    return type == 'normal' ?
      <View style={[styles.container, this.props.style]}>
        {!this.props.hiddenAvatar && <Image source={{ uri: this.avatar() }} style={styles.avatarNormal} /> }
        <View>
          <Text style={[styles.name, this.props.styleName]}>{user.name}</Text>
          <Text style={[styles.headline, this.props.styleHeadline]}>{user.headline}</Text>
        </View>
      </View> :
      type == 'small' ? <View style={[styles.container, this.props.style]}>
        {!this.props.hiddenAvatar && <Image source={{ uri: this.avatar() }} style={styles.avatarSmall} /> }
        <Text style={[styles.name, this.props.styleName]}>
          {user.name}
        </Text>
      </View> :
      <Text style={[styles.name, this.props.style, this.props.styleName]}>
        {user.name}
      </Text>
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarSmall: { height: 20, width: 20, borderRadius: 10, marginRight: 5 },
  avatarNormal: { height: 30, width: 30, borderRadius: 15, marginRight: 5 },
  headline: { color: 'gray', fontSize: 12, marginTop: 2 },
  name: { color: '#333', fontWeight: '500', fontSize: 14 }
})