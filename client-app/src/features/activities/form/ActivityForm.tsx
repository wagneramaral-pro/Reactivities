
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm(){
    const {activityStore} = useStore();
    const {loading,createActivity, updateActivity, selectedActivity, 
        loadingActivity, loadingInitial} = activityStore;

    const {id} = useParams();
    const navigate = useNavigate();
    const [activity,setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });
    
    useEffect(()=>{
        if(id && !activity.id) loadingActivity(id).then(activity => setActivity(activity!));
    },[id,loadingActivity]);

    function handleInputChange(event : ChangeEvent<HTMLInputElement|HTMLTextAreaElement|any>)
    {
        const {name,value}= event.target;
        setActivity({...activity, [name]:value});        
        console.log('change '+activity.description);
    }

    function handleSubmit(){
        if(!activity.id){
            activity.id = uuid();
            createActivity(activity).then(()=>navigate(`/activities/${activity.id}`)); 
        }
        else{
            updateActivity(activity).then(()=>navigate(`/activities/${activity.id}`));;
        }
    }
    if(loadingInitial || !activity) return(<LoadingComponent content={'Loading'} />);

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} onChange={handleInputChange} name='description' />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' type="date" value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated='right' loading={loading} positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
});
