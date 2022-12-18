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
import CreateReiew from "./components/createReview";
import MyProfile from "./components/Your-Content";
import './index.css'
import Editreview from "./components/EditAReview";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="sitewide">
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
          <Route exact path='/spots/:spotId/create-review'>
            <CreateReiew />
          </Route>
          <Route exact path='/my-profile'>
            < MyProfile />
          </Route>
          <Route exact path='/reviews/edit/:reviewId'>
            <Editreview />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
