import React,{Component} from 'react';

import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
}from 'react-native';
import Settings from './Settings.js';

import realm from './realmManager.js';

class SettingsIcon extends Component{
  toSettings(){
    this.props.toRoute({
      component: Settings,
      data: realm.objects('Color')[0].color
    });
  }
  render(){
    return(
      <TouchableHighlight onPress={this.toSettings.bind(this)} style={styles.settingsWrapper} underlayColor='transparent'>
      <Image style={{height:35, width: 35,}} source={require('./gearIcon.png')} />
      </TouchableHighlight>
      /*
      <TouchableHighlight onPress={this.toSettings.bind(this)} style={styles.settingsWrapper} underlayColor='transparent'>
      <Text style={styles.gear}>{'⏣'||'੦'}</Text>
      </TouchableHighlight>
      https://pixabay.com/static/uploads/photo/2016/03/31/18/43/gear-1294576_960_720.png
      */

    );
  }
}

const styles = StyleSheet.create({
  settingsWrapper:{
    marginLeft: 0,
  },
  gear:{
    fontSize: 38,
    color: 'white',

  }
});

export default SettingsIcon;
