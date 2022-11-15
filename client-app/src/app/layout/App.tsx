import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import {v4 as uuid} from 'uuid';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() =>  {
    axios.get<Activity[]>('http://localhost:5000/api/Activities').then( response => {
      setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(id: string)
  {
      setSelectedActivity(activities.find(x => x.id === id));
  }
  function handleCancelSelectActivity()
  {
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id?: string)
  {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();    
    setEditMode(true);
  }
  function handleFormClose()
  {
    setEditMode(false);
  }
  function handleCreateOrUpdateActivity(activity:Activity)
  {
    activity.id 
    ? setActivities([...activities.filter(x=> x.id !== activity.id),activity])
    : setActivities([...activities , {...activity , id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  function handleDeleteActivity(activity:Activity)
  {
      setActivities([...activities.filter(x => x.id !== activity.id)]);
  }
  return (
    
    <>
      <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop:'6em'}}>
          <ActivitiesDashboard 
          activities={activities}
          selectedActivity = {selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          createOrEdit = {handleCreateOrUpdateActivity}
          deleteActivity = {handleDeleteActivity}
          />
        </Container>
    </>
    
  );
}

export default App;
