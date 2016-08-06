import React,{Component} from 'react';
import realm from './realmManager.js';


import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  ListView,
  ToastAndroid
}from 'react-native';
import TodoList from './TodoList.js';
import SettingsIcon from './SettingsIcon.js';


class Settings extends Component{
  constructor(){
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dataSource = this.ds.cloneWithRows(['#e24e42','#328cc1','#eb6e80','#94618e','#f2d388','#93c178','#919391','#f19f4d','#88d317','#d48cf8','#155765', '#1fb58f','#99ced4','#cda34f']);

    this.state={
      newTitle: '',
      potentialColor: realm.objects('Color')[0].color,
    }
  }
  updateText(text){
    this.setState({
      newTitle: text,
      potentialColor: this.state.potentialColor
    });
  }

  submitTitle(){
    this.setState({
      newTitle: '',
      potentialColor: this.state.potentialColor,
    });
    realm.write(()=>{
        realm.objects('TodoTitle')[0].title = this.state.newTitle;
    });

    this.props.resetToRoute({
      name: realm.objects('TodoTitle')[0].title,
      component: TodoList,
      rightCorner: SettingsIcon,
      passProps:{
        theme: realm.objects('Color')[0].color
      }
    });
  }

  onColorSumbit(color){
    this.setState({
      newTitle: this.state.newTitle,
      potentialColor: color,
    })
  }


  submitThemeChange(){

    ToastAndroid.show('Restart App to Apply Changes',ToastAndroid.SHORT);
    realm.write(()=>{
      realm.objects('Color')[0].color = this.state.potentialColor;
    });

    this.props.resetToRoute({
      name: realm.objects('TodoTitle')[0].title,
      component: TodoList,
      rightCorner: SettingsIcon,
      passProps:{
        theme: realm.objects('Color')[0].color
      }
    });

  }

  renderSingleColor(color){

    return(
      <TouchableHighlight onPress={this.onColorSumbit.bind(this, color)}>
        <View style={{flex:1, height: 60, backgroundColor: color}}></View>
      </TouchableHighlight>
    );
  }

  render(){
    return(
    <View style={styles.container}>

    <View style={styles.titleChange}>
    <Text style={styles.changeText}>Change Task List Title</Text>
    <TextInput style={{marginRight: 70,}} onChangeText={this.updateText.bind(this)} placeholder={realm.objects('TodoTitle')[0].title}/>
    <View style={styles.changeButtonWrapper}elevation={0} >
      <TouchableHighlight onPress={this.submitTitle.bind(this)} underlayColor='transparent'>
        <Text style={styles.changeButtonText}>Save Title</Text>
      </TouchableHighlight>
    </View>
    </View>

    <View style={styles.themeChange}>
      <Text style={styles.changeText}>Change Task List Theme</Text>

      <ScrollView contentContainerStyle={styles.colorView}>
      <ListView dataSource={this.dataSource} renderRow={this.renderSingleColor.bind(this)}/>
      </ScrollView>

      <View style={{ alignSelf:'stretch',
       borderRadius: 24,
       marginRight: 160,
       marginLeft: 0,
       marginBottom:10,
       marginTop: 16,
       padding: 8,
       backgroundColor:this.state.potentialColor}} elevation={0} >
        <TouchableHighlight onPress={this.submitThemeChange.bind(this)} underlayColor='transparent'>
          <Text style={styles.changeButtonText}>Update Theme</Text>
        </TouchableHighlight>
      </View>
    </View>


    <View style={styles.appVersion}>
      <Text style={{fontStyle: 'italic'}}>Task List Version: 1.4</Text>
    </View>

  </View>
);
  }
}
 const styles = StyleSheet.create({
   container:{
     flex:1,
     backgroundColor: '#dfdce3',
   },
   changeText:{
     fontSize: 18,
     color: 'black'
   },
   themeChangeText:{
     fontSize: 18,
     color: 'black',

   },
   titleChange:{
     //flex: 5,
     padding: 8,
     paddingBottom: 20,
     borderBottomWidth: 1,
     borderColor: '#939391',
   },
   themeChange:{
     flex: 5,
     borderBottomWidth: 1,
     borderColor: '#939391',
     padding: 8,
     paddingBottom:10,
     paddingTop: 15,

   },
   colorView:{
     flex: 1,
     padding: 0,
     marginTop: 15,
     borderWidth: 1,
     borderColor: '#939391',
   },
   changeButtonWrapper:{
     alignSelf:'stretch',
      borderRadius: 24,
      marginRight: 160,
      marginLeft: 0,
      marginBottom:0,
      marginTop:10,
      padding: 8,
      backgroundColor:realm.objects('Color')[0].color,
   },
   themeButtonWrapper:{
     alignSelf:'stretch',
     borderRadius: 24,
     marginRight: 160,
     marginLeft: 0,
     marginBottom:10,
     marginTop: 16,
     paddingBottom: 40,
     backgroundColor:realm.objects('Color')[0].color,
   },
   changeButtonText:{
     fontSize:14,
     color: 'white',
     textAlign:'center',
   },

   appVersion:{

     padding:20,


   },
 })

export default Settings;
