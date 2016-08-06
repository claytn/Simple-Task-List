/*Todo: work on styling of scroll view area. Should there be a faint border near bottom?*/

import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Navigator,
} from 'react-native';

import TodoListCreator from './TodoListCreator.js';
import TodoList from './TodoList.js';
import realm from './realmManager.js';
import {ListView} from 'realm/react-native';
import BackArrow from './BackArrow.js';

class TodoMenu extends Component{

  constructor(props){
    super(props);
    this.ds =  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      dataSource:this.ds.cloneWithRows(realm.objects('TodoLists')),
    }
  }

  deleteTodoList(todoList){
    const currentTitle = todoList.title + '';
    realm.write(()=>{
    /*
      for(var i = 0; i < realm.objects('TodoItems').length; i++){
          console.log(realm.objects('TodoItems')[i].listTitle);
          if(realm.objects('TodoItems')[i].listTitle === 'todo'){
            realm.delete(realm.objects('TodoItems')[i]);
          }
      }*/


      realm.delete(realm.objects('TodoItems'));
      realm.delete(realm.objects('TodoLists'));
    });


    this.setState({
      dataSource:this.ds.cloneWithRows(realm.objects('TodoLists')),
    });


  }

  renderTodoList(todoList){
    this.props.toRoute({
      name: todoList.title,
      component: TodoList,
      passProps:{
        title: todoList.title,
      }
    });
  }


  renderSingleList(todoList){
      return(
        <TouchableHighlight onPress={this.renderTodoList.bind(this,todoList)} underlayColor='aliceblue'>
          <View style={styles.singleTodoList}>
          <Text style={styles.listTitle}>{todoList.title}</Text>
          <Text style={styles.listDescription}>{todoList.description}</Text>
          <TouchableHighlight style={styles.deleteTodoList} onPress={this.deleteTodoList.bind(this, todoList)}>
            <Text style={styles.deleteTodoListText}>✕</Text>
          </TouchableHighlight>
          </View>
        </TouchableHighlight>
      );
  }

  createNewList(){
    this.props.toRoute({
      name:'Create Todo List',
      component: TodoListCreator,
      sceneConfig: Navigator.SceneConfigs.VerticalDownSwipeJump,
    });
  }

  render(){
    return(

      <View style={styles.container}>

        <ListView  enableEmptySections={true} dataSource={this.state.dataSource} renderRow={this.renderSingleList.bind(this)} />

        <View style={styles.addButtonWrapper}>
        <TouchableHighlight elevation={5} style={styles.addButton} onPress={this.createNewList.bind(this)} underlayColor='white'>
          <Text style={styles.addButtonText}>Add TodoList</Text>
        </TouchableHighlight>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#d9d9d9',

  },
  listTitle:{
    fontSize:18,
  },
  listDescription:{
    fontSize:10,
  },

  singleTodoList:{
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#939391',
    position: 'relative',
    justifyContent: 'center',

  },

  deleteTodoList:{
    position: 'absolute',
    right: 10,
    bottom: 15,
  },

  deleteTodoListText:{
    fontSize: 30,
    color: '#ff3333',
    marginTop: 20,
  },

  addButtonWrapper:{

    justifyContent:'flex-end',
    alignSelf:'stretch',
    borderWidth:2,
    borderColor: 'black',
    borderRadius: 4,
    marginRight: 20,
    marginLeft: 20,
    marginBottom:35,
    marginTop: 40,

  },

  addButton:{
    backgroundColor:'#66b3ff',

  },
  addButtonText:{
    fontSize:20,
    color: 'black',
    textAlign:'center',
  }
});
