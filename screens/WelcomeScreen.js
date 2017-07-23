import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

//表示するデータの作成
const SLIDE_DATA = [
  { text: 'Jobアプリへようこそ', color: '#03A9F4' },
  { text: '位置情報を設定してスワイプ', color: '#009688' }
];

class WelcomeScreen extends Component {
state = { token: null }

async componentWillMount() {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    this.props.navigation.navigate('map');
    this.setState({ token });
  } else {
    this.setState({ token: false });
  }
}

//ボタン押した後Authスクリーンへ
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }

    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)} />
    );
  }
}

export default WelcomeScreen;
