import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import VideoPlayer from './containers/video-container';
import StreamsContainer from './containers/streams-container';
import Login from './components/forms/login';
import {requireAuthentication} from './components/AuthenticatedComponent';
import ArtistContainer from './containers/artist-container';
import AuthenticationContainer from './components/auth/authenticatePage';

export default (

    <Route path="/" component={ App } >

        <IndexRoute component={ StreamsContainer } />
        <Route path="streamYourself" component={requireAuthentication(ArtistContainer)} />
        <Route path="authenticateFacebook" component={AuthenticationContainer} />
    </Route>

);
