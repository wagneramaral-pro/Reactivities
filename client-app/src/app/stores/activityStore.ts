import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';
import {format} from 'date-fns';

export default class ActivityStore{
    activityRegistry = new Map<string,Activity>();
    selectedActivity : Activity | undefined = undefined;
    editMode=false;
    loading=false;
    loadingInitial=false

    constructor (){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort( (a,b) =>             
            a.date!.getTime() - b.date!.getTime());
            //Date.parse(a.date)-Date.parse(b.date));
            
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities,activity) => {
                const date:string= format(activity.date!,'dd MMM yyyy h:mm aa');
                activities[date] = activities[date] ? [...activities[date],activity] : [activity];
                
                return activities 
            },{} as {[key:string]:Activity[]})
        )
        /*return Object.entries(
                this.activitiesByDate.reduce((activities,activity)=>{
                    const date=activity.date;
                    activities[date]= activities[date] ? [...activities[date], activity] : [activity];
                }, {} as { [key:string] : Activity[]})
        )*/
    }
    loadingActivities = async () =>{        
        try{
            this.setLoadingInitial(true);            
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity =>{
                    this.setActivity(activity);
                });
                this.setLoadingInitial(false);
            });
        }
        catch(error){
            console.log("Error");
            console.log(error);
            runInAction(() => {
            this.setLoadingInitial(false);
            });
        }
    }
    loadingActivity = async (id:string) =>{        
        let activity =  this.getActivity(id);
        
        if(activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else{
            //get from api            
            try{
                this.setLoadingInitial(true);
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(()=>this.selectedActivity = activity);                
                this.setLoadingInitial(false);
                return activity;
            }
            catch(error)
            {
                console.log(error);
                this.setLoadingInitial(false);
            }            
        }
    }
    private setActivity = (activity:Activity) => {
        activity.date = new Date(activity.date!);        
        this.activityRegistry.set(activity.id,activity);
    }
    private getActivity = (id:string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state:boolean) =>
    {
        this.loadingInitial = state;
    }
    /*selectActivity = (id:string) =>
    {
        this.selectedActivity = this.activityRegistry.get(id);
    }
    cancelSelectedActivity = () =>
    {
        this.selectedActivity = undefined;
    }
    openForm = (id?:string) =>
    {        
        id? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }
    closeForm =() =>
    {
        this.editMode = false;
    }*/
    createActivity = async (activity:Activity) =>{
        this.loading =true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction(() =>{
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode=false;
                this.loading=false;
            });
        }
        catch(error)
        {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
    updateActivity = async (activity:Activity) =>{
        this.loading =true;
        try{
            await agent.Activities.update(activity);
            runInAction(() =>{
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode=false;
                this.loading=false;
            });
        }
        catch(error)
        {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })               
        }
    }
    deleteActivity = async (id:string) =>{
        this.loading =true;
        try{
            await agent.Activities.delete(id);
            runInAction(() =>{
                this.activityRegistry.delete(id);
                //if(this.selectedActivity?.id === id)  this.selectedActivity = undefined;
                this.editMode=false;
                this.loading=false;
            });
        }
        catch(error)
        {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })               
        }
    }
}