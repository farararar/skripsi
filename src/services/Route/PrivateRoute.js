import React, {useContext} from 'react';
import {Context as AuthContext} from '../../services/Context/AuthContext'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useContext(AuthContext)
    return (
        <Route {...rest} render={props => isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/signin', state: {from: props.location} }} />
            )}
        />
    );
}

export default PrivateRoute;
