import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar(){
    const {activityStore} = useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
            <Menu.Item>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'15px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu name='Activities' />
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content='Create Activities' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
/*<Menu.Item>
<img src="/assets/logo" alt="logo"/>
Reactivities
</Menu.Item>
<Menu name='Activities' />
<Menu.Item>
<Button positive content='Create Activities' />
</Menu.Item>
*/