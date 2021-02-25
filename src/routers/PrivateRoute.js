import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    const {location:{pathname}} = rest;
    localStorage.setItem('lastpathname', pathname)
    return (
        <Route {...rest}
            component={
                (props) => (
                    (isAuthenticated)
                    ? (<Component {...props} />)
                    : (<Redirect to='/login' />)
                )
            }
        />
    )
}
PrivateRoute.protoType = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}