import React from 'react';

export default class Screen extends React.PureComponent {
  navigate = this.props.navigation.navigate;
  params = this.props.navigation.state.params;
  setParams = this.props.navigation.setParams;
  goBack = this.props.navigation.goBack;
}