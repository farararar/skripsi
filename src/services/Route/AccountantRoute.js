import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Context as AuthContext} from '../../services/Context/AuthContext'

const AccountantRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useContext(AuthContext)
    return (
        <Route {...rest} render={props => isAuthenticated() && isAuthenticated().data.level === 'Accountant' ? (
                <Component {...props} />
            ) : (
                <Redirect to ={{ pathname: '/', state: {from: props.location} }} />
            )} 
        />
    );
}

export default AccountantRoute;

