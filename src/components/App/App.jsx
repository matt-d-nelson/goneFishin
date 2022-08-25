//---------------------imports---------------------//
// libraries
import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import LoginPage from "../LoginPage/LoginPage";
import Design from "../Design/Design";
import Edit from "../Edit/Edit";
import Cart from "../Cart/Cart";
import Admin from "../Admin/Admin";
import GlobalModal from "../GlobalModal/GlobalModal";

// styling
import "./App.css";

function App() {
  //---------------------imported methods---------------------//
  const dispatch = useDispatch();

  //---------------------reducer state---------------------//
  const user = useSelector((store) => store.user);

  //---------------------on mount---------------------//
  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  //---------------------JSX return---------------------//
  return (
    <Router>
      <div>
        <GlobalModal />
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route
            // logged in shows Design page else shows LoginPage
            exact
            path="/design"
          >
            <Design />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Edit page else shows LoginPage
            exact
            path="/edit/:id"
          >
            <Edit />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Cart page else shows LoginPage
            exact
            path="/cart"
          >
            <Cart />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Admin page else shows LoginPage
            exact
            path="/admin"
          >
            {user.role > 0 ? (
              // if user is an admin, show admin page
              <Admin />
            ) : (
              // Otherwise, go to login page
              <UserPage />
            )}
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LoginPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
