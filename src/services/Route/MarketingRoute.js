import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Context as AuthContext} from '../../services/Context/AuthContext'

const MarketingRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useContext(AuthContext)
    return (
        <Route {...rest} render={props => isAuthenticated() && isAuthenticated().data.level === 'Marketing' ? (
                <Component {...props} />
            ) : (
                <Redirect to ={{ pathname: '/', state: {from: props.location} }} />
            )} 
        />
    );
}

export default MarketingRoute;

