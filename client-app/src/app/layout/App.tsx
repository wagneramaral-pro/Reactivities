import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
function App() 
{
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() =>  {
    agent.Activities.list().then( response => {
      let activities : Activity[] = [];

      response.forEach(activity =>{
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(response);
      setLoading(false);
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
    setIsWorking(true);
    if(activity.id){
      agent.Activities.update(activity).then()
      {
        setActivities([...activities.filter(x=> x.id !== activity.id),activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setIsWorking(false);
      }
    }
    else{
      activity.id = uuid();
      agent.Activities.create(activity).then()
      {
        setActivities([...activities , {...activity , }]);
        setSelectedActivity(activity);
        setEditMode(false);
        setIsWorking(false);
      }
    }
  }
  function handleDeleteActivity(id:string)
  {
    setIsWorking(true);
    agent.Activities.delete(id).then(()=>
    {
      setActivities([...activities.filter(x => x.id !== id)]);
      setIsWorking(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app' />
  return (    
    <>
    
    {isWorking ? 'Working' : 'not working'}
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
          isWorking={isWorking}          
          />
        </Container>
    </>
    
  );
}

export default App;
