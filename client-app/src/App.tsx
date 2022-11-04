import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import axios from 'axios';
import { Header,List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([])

  useEffect(() =>  {
    axios.get('http://localhost:5000/api/Activities').then( response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  return (
    <div className="App">
      <Header as='h2' icon='users' content='Reactivities' />
      <header className="App-header">
        <List >
          {activities.map((activity:any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>))}
        </List>
      </header>
    </div>
  );
}

export default App;
