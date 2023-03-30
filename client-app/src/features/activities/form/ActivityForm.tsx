import { observer } from 'mobx-react-lite';
import React, { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

export default observer(function ActivityForm(){
    const {activityStore} = useStore();
    const navigate = useNavigate ();
    const {loading,createActivity, updateActivity, 
        loadingActivity, loadingInitial} = activityStore;

    const {id} = useParams<{id:string}>();//useParams();
    //const navigate = useNavigate();

    const [activity,setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: ''
    });
    
    const validationSchema= Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity title is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Please set date'),
        venue: Yup.string().required(),
        city: Yup.string().required()
    });
    useEffect(()=>{
 
    },[id,loadingActivity]);

    function handleFormSubmit(activity:Activity){
        
        if(activity.id.length === 0){
            let newActivity ={
                ...activity,
                ui:uuid()
            };
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }
    /*function handleInputChange(event : ChangeEvent<HTMLInputElementMyTextInputElement|any>)
t;
       ame]:value});        
    activity.descriion handleSubmit(){
        if(!activity.id){
            activity.id = uuid();
            createActivity(activity).then(()=>navigate(`/activities/${activity.id}`)); 
        }
        else{
            updateActivity(activity).then(()=>navigate(`/activities/${activity.id}`));;
        }
    }*/
    if(loadingInitial || !activity) return(<LoadingComponent content={'Loading'} />);

    return(
        <Segment clearing>
            <Header content='Activity details' sub color='teal' />
            <Formik validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)} >
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='title' name='title' />
                        <MyTextArea placeholder='Description' name='description' rows={3 }/>
                        <MySelectInput placeholder='Category' name='category' 
                            options={categoryOptions} />
                        <MyDateInput 
                            placeholderText='date' 
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                            name='date' />
                        <Header content='Location details' sub color='teal' />
                        <MyTextInput placeholder='City'name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            floated='right' loading={loading} positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>            
        </Segment>
    )
});

