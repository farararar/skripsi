import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Context as AuthContext} from '../../services/Context/AuthContext'

const AdminRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useContext(AuthContext)
    return (
        <Route {...rest} render={props => isAuthenticated() && isAuthenticated().data.level === 'Admin' ? (
                <Component {...props} />
            ) : (
                <Redirect to ={{ pathname: '/', state: {from: props.location} }} />
            )} 
        />
    );
}

export default AdminRoute;

