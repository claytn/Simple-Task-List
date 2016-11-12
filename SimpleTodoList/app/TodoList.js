
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
//  <Text style={styles.completedTask}>{(todo.completed)? '✓':' '}</Text>
import realm from './realmManager';
import {ListView} from 'realm/react-native';
import TodoCreator from './TodoCreator.js';
import TodoEditor from './TodoEditor.js';

class TodoList extends Component{
 constructor(props){

    super(props);
    this.ds =  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state={
      dataSource:this.ds.cloneWithRows(realm.objects('TodoItems').sorted('completed')),
    }
  }

  deleteTodo(todo){
    realm.write(()=>{
      realm.delete(todo);
    });

    this.setState({
      dataSource:this.ds.cloneWithRows(realm.objects('TodoItems').sorted('completed')),
    });
  }

  updateCompletion(todo){
    realm.write(()=>{
      todo.completed = !todo.completed;
    });

    this.setState({
      dataSource:this.ds.cloneWithRows(realm.objects('TodoItems').sorted('completed')),
    });

    setTimeout(this.deleteTodo.bind(this, todo), 800);
  }

  updateTask(task){
    this.props.toRoute({
      component: TodoEditor,
      passProps:{
        task: task,
      }
    });
  }

  renderNote(note){
    return(
      <Text>{note}</Text>
    );
  }


  renderSingleTodo(todo){


      //if(todo.notes === ''){
        return(
          <TouchableHighlight onPress={this.updateTask.bind(this, todo)} underlayColor='transparent'>
          <View style={styles.singleTodoWrapper}>

          <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={(todo.completed) ? styles.todoTextLineThrough : styles.todoText}>{todo.text}</Text>
          <Text style={(todo.completed) ? styles.todoNotesLineThrough : styles.todoNotes}>{todo.notes}</Text>
          </View>

          <View style={styles.deleteTodoWrapper}>
          <TouchableHighlight style={styles.deleteTodo} onPress={this.updateCompletion.bind(this, todo)} underlayColor='transparent'>
            <Text style={styles.deleteTodoText}>✕</Text>
          </TouchableHighlight>
          </View>

          </View>
          </TouchableHighlight>
        );
    /*  }else{

        return(
          <TouchableHighlight onPress={this.updateTask.bind(this, todo)} underlayColor='transparent'>
          <View style={styles.singleTodoWrapper}>
          <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={(todo.completed) ? styles.todoTextLineThrough : styles.todoText}>{todo.text}</Text>
          <Text style={(todo.completed) ? styles.todoNotesLineThrough : styles.todoNotes}>{todo.notes}</Text>
          </View>
          <TouchableHighlight style={styles.deleteTodo} onPress={this.updateCompletion.bind(this, todo)} underlayColor='transparent'>
            <Text style={styles.deleteTodoText}>✕</Text>
          </TouchableHighlight>
          </View>
          </TouchableHighlight>
        );
      }
      */
  }

  createNewTodo(){
    this.props.toRoute({
      component: TodoCreator,

    });
  }

  render(){

    return(
    <View style={styles.container}>
      <ListView enableEmptySections={true} dataSource={this.state.dataSource} renderRow={this.renderSingleTodo.bind(this)} />
      <View style={[styles.addButtonWrapper, { backgroundColor:realm.objects('Color')[0].color }]} elevation={0}>
        <TouchableHighlight elevation={5} style={styles.addButton} onPress={this.createNewTodo.bind(this)} underlayColor='transparent'>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableHighlight>
      </View>
    </View>
    );
  }



}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#dfdce3',

  },

  singleTodoWrapper:{
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#939391',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  /*singleTodoWrapper:{
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 22,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderColor: '#939391',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },*/
  textWrapper:{
    marginLeft: 5,
    marginRight:20,
    flex: 7,

  },
  todoText:{
      fontSize:18,
        color: '#585858',


  },
  todoTextLineThrough:{
      fontSize:18,
      color: '#585858',
      textDecorationLine: 'line-through',

  },
  todoNotes:{
      fontSize: 12,
      fontStyle: 'italic',

  },
  todoNotesLineThrough:{
      fontSize: 12,
      fontStyle: 'italic',
      textDecorationLine: 'line-through',

  },

  completedTask:{
    fontSize: 22,
    color:'green',
    fontWeight: 'bold',

  },


  deleteTodo:{
  /*  position:'absolute',
    bottom: 16,
    right: 10,

    flex: 2
    */
  },

  deleteTodoText:{
    fontSize: 30,
    color: '#ff3333'
  },
  addButtonWrapper:{
    justifyContent:'flex-end',
    alignSelf:'stretch',
    borderRadius: 24,
    marginRight: 60,
    marginLeft: 60,
    marginBottom:35,
    marginTop: 40,
    padding: 10,

  },

  addButton:{


  },
  addButtonText:{
    fontSize:20,
    color: 'white',
    textAlign:'center',


  }
});

export default TodoList;
