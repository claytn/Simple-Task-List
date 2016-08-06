/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './app/app.js';
import realm from './app/realmManager.js';




class SimpleTodoList extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <App theme={realm.objects('Color')[0].color} />
    );
  }
}






AppRegistry.registerComponent('SimpleTodoList', () => SimpleTodoList);
