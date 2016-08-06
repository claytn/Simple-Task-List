import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Navigator,
} from 'react-native';

import realm from './realmManager';
import TodoMenu from './TodoMenu.js';

class TodoListCreator extends Component{
  constructor(){
    super();
    this.state = {
      title: '',
      description: '',
    };
  }
  updateTitleText(text){
    this.setState({
        title: text,
        description: this.state.description,
    });
  }

  updateDescriptionText(text){
    this.setState({
        title: this.state.title,
        description: text,
    });
  }

  createNewList(){
    if(this.state.title === ''){
      return;
    }
    var allTodolists = realm.objects('TodoLists');
    var count = 0;
    for(var i = 0; i < allTodolists.length; i++){
      if(allTodolists[i].title === this.state.title){
        count++;
      }
    }

    if(count === 0){
    realm.write(()=>{
      realm.create('TodoLists',{title: this.state.title, description: this.state.description});
    });
    this.setState({
      title: '',
      description: '',
    });
    }

    this.props.resetToRoute ({
      name:'Simple Todo List Menu',
      component: TodoMenu,
      sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump,
    });
  }

  render(){
    return(
      <View style={styles.container}>

          <View style={styles.form}>
          <View style={styles.inputArea}>
          <Text style={styles.inputHeader}>Todo List Title</Text>
          <TextInput onChangeText={(text)=>{this.updateTitleText(text);}}/>
          </View>

          <View style={styles.inputArea}>
          <Text style={styles.inputHeader}>Todo List Description (Optional)</Text>
          <TextInput onChangeText={(text)=>{this.updateDescriptionText(text);}}/>
          </View>
          </View>

          <View style={styles.createButtonWrapper}>
          <TouchableHighlight elevation={5} style={styles.createButton} onPress={this.createNewList.bind(this)} underlayColor='white'>
            <Text style={styles.createButtonText}>Create TodoList</Text>
          </TouchableHighlight>
          </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({

    container:{
      flex:1,
      backgroundColor:'#d9d9d9',
    },
    form:{
      marginTop: 90,
      marginRight:10,
      marginLeft: 10,

    },
    inputHeader:{
      fontWeight: 'bold',
      color: 'black'
    },

    inputArea:{
      marginBottom: 30,
    },

    createButtonWrapper:{
      justifyContent:'flex-end',
      alignSelf:'stretch',
      borderWidth:2,
      borderColor: 'black',
      borderRadius: 4,
      marginRight: 20,
      marginLeft: 20,
      marginBottom:35,
    },

    createButton:{
      backgroundColor:'#66b3ff',

    },
    createButtonText:{
      fontSize:20,
      color: 'black',
      textAlign:'center',
    }
});

export default TodoListCreator;
