import { Link } from "react-router-dom"
import {Button, Header,Icon,Segment} from "semantic-ui-react"

export default function NotFound(){
    return(
        <Segment>
            <Header>
                <Icon name='search' />
                Ooops - I've looked everywhere, could not find what you want
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities'>
                    Return to activities page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}