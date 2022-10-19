// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/SplashPage";
import SpotDetail from "./components/spotDetail";
import EditSpotForm from "./components/EditASpot";
import DeleteASpot from "./components/DeleteASpot";
import ReviewSpot from "./components/ReviewsBySpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            < AllSpots />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route exact path='/spots/edit/:spotId'>
            <EditSpotForm />
          </Route>
          <Route exact path='/spots/delete/:spotId'>
            <DeleteASpot />
          </Route>
          <Route exact path='/spots/reviews/:spotId'>
            <ReviewSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
