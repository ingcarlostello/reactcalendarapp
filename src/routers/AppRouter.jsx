import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from "../actions/auth";
import LoginScreen from "../components/authentication/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const AppRouter = () => {

  const dispatch = useDispatch();

  const {checking, uid} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])


  if(checking){
    return (<h5>Loading...</h5>)
  }

  return (
    <Router>
      <div>
        <Switch>
            <PublicRoute 
              exact 
              path='/login' 
              component={LoginScreen} 
              // los signos de admiracion pasan un string a valor booleano
              isAuthenticated={!!uid}
            />
            <PrivateRoute 
              exact 
              path='/' 
              component={CalendarScreen} 
              isAuthenticated={!!uid}
            />
            
            {/* this line redirect to calendarScreen if the route does not exist */}
            <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
