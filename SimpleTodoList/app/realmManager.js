import Realm from 'realm';

import React,{Component} from 'react';

let TodoTitle = {
  name: 'TodoTitle',
  properties:{
    title: {type: 'string', default: 'My Todo List Title'}
  }
}

let TodoItems = {
  name:'TodoItems',
  properties:{
    text:'string',
    notes: 'string',
    completed:{type:'bool', default: false},
  },
};

let Color = {
  name: 'Color',
  properties:{
    color: 'string'
  }
}

var realm = new Realm({schema:[TodoItems, TodoTitle, Color], schemaVersion: 7});

realm.write(()=>{
  realm.create('Color',{color: '#5eb79b'});
  realm.create('TodoTitle', {title: 'Change Task List Title  ➜'});
});




export default realm;
