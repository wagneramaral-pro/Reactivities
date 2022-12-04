import React, { useEffect } from 'react';
//import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from "mobx-react-lite";

function App() 
{
  const {activityStore} = useStore();

  useEffect(() =>  {    
      activityStore.loadingActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent  content='Loading app' />
  return (    
    <>    
      <NavBar />
        <Container style={{marginTop:'6em'}}>
                <h2>{activityStore.activitiesByDate.length}</h2>
          <ActivitiesDashboard />
        </Container>
    </>
    
  );
}

export default observer(App);
