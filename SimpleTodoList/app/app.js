import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import realm from './realmManager.js';
import Router from 'react-native-simple-router';
import TodoList from './TodoList.js';
import SettingsIcon from './SettingsIcon.js';


const FIRST_ROUTE = {

  name: realm.objects('TodoTitle')[0].title,
  component: TodoList,
  rightCorner: SettingsIcon,
  passProps:{
    theme: realm.objects('Color')[0].color
  }
};



class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    realm.addListener('change', () => {
      this.forceUpdate();
    });
  }


  render() {
    return (
        <Router firstRoute={FIRST_ROUTE} headerStyle={{backgroundColor: realm.objects('Color')[0].color}} handleBackAndroid={true} titleStyle={styles.titleStyle} />
    );
  }
}


const styles = StyleSheet.create({

  titleStyle:{
    fontSize:21,
    marginLeft: 20,
    fontWeight: 'bold',
  

  }
});

export default App;
