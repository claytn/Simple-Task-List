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
import TodoList from './TodoList.js';
import SettingsIcon from './SettingsIcon.js';

class TodoListCreator extends Component{
  constructor(){
    super();
    this.state = {
      todo: '',
      notes: '',
    };
  }
  updateTodoText(text){
    this.setState({
        todo: text,
        notes: this.state.notes,
    });
  }

  updateNoteText(text){
    this.setState({
        todo: this.state.todo,
        notes: text,
    });
  }

  createNewTodo(){
    if(this.state.todo === ''){
      return;
    }


    realm.write(()=>{
      realm.create('TodoItems',{text: ((this.state.todo)[0].toUpperCase() + (this.state.todo).substr(1)) , notes:this.state.notes});
    });

    this.setState({
      todo: '',
      notes: '',
    });

    this.props.resetToRoute({
      name:realm.objects('TodoTitle')[0].title,
      component: TodoList,
      rightCorner: SettingsIcon,
      passProps:{
        theme: realm.objects('Color')[0].color
      }
    });

  }

  render(){
    return(
      <View style={styles.container}>

          <View style={styles.form}>
          <View style={styles.inputArea}>
          <Text style={styles.inputHeader}>Task to do</Text>
          <TextInput onChangeText={(text)=>{this.updateTodoText(text);}} value={this.state.todo} />
          </View>

          <View style={styles.inputArea}>
          <Text style={styles.inputHeader}>Notes</Text>
          <TextInput onChangeText={(text)=>{this.updateNoteText(text);}} value={this.state.notes} multiline={true}  />
          </View>
          </View>

          <View style={[styles.createButtonWrapper, { backgroundColor:realm.objects('Color')[0].color }]} elevation={0}>
          <TouchableHighlight elevation={5} style={styles.createButton} onPress={this.createNewTodo.bind(this)} underlayColor='transparent'>
            <Text style={styles.createButtonText}>Create Task</Text>
          </TouchableHighlight>
          </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({

    container:{
      flex:1,
      backgroundColor:'#dfdce3',
    },

    form:{
      marginTop: 90,
      marginRight:10,
      marginLeft: 10,

    },
    inputHeader:{
      fontSize: 18,
    },

    inputArea:{
      marginBottom: 30,
    },

    createButtonWrapper:{
       justifyContent:'flex-end',
        alignSelf:'stretch',
        borderRadius: 24,
        marginRight: 75,
        marginLeft: 75,
        marginBottom:35,
        padding: 10,
    },

    createButton:{


    },
    createButtonText:{
      fontSize:20,
      color: 'white',
      textAlign:'center',
    }
});

export default TodoListCreator;
