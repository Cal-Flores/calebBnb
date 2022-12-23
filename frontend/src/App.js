// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/SplashPage";
import SpotDetail from "./components/spotDetail";
import MyProfile from "./components/Your-Content";
import './index.css'
import Footer from "./components/Footer/footer";
import SearchedResult from "./components/SearchResult/searchResult";




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="sitewide">
      <Navigation isLoaded={isLoaded} />
      <Footer />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            < AllSpots />
          </Route>
          <Route exact path='/search-results'>
            <SearchedResult />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route exact path='/my-profile'>
            < MyProfile />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
