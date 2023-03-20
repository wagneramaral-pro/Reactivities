import { Button, Container, Menu } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom'

export default function NavBar(){
    return(
        <Menu inverted fixed='top'>
            <Container>
            <Menu.Item as={NavLink} to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'15px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item>
                    <Button as={NavLink} to='/CreateActivity' positive content='Create Activities' />
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