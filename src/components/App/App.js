import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import { AuthContext } from "../../firebase/Auth";
import { AdminUsersContext } from "../../contexts/adminUsersContext";

import VideoSelectionPage from "../VideoSelectionPage";
import LectureViewer from "../LectureViewer";
import CoachCMS from "../CoachCMS";
import HeaderBar from "../HeaderBar";
import Login from "../Login";
import PrivateRoute from "../PrivateRoute";
import Restricted from "../Restricted";
import Footer from "../Footer";

function App() {
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);

  return (
    <>
      <PrivateRoute
        path="/"
        render={() => (
          <>
            <HeaderBar />
          </>
        )}
      />

      <Switch>
        <Route exact path="/login" component={Login} />

        <PrivateRoute
          exact
          path="/"
          render={() => (
            <>
              <VideoSelectionPage />
            </>
          )}
        />

        <PrivateRoute
          exact
          path={"/videoviewer/:id"}
          render={() => (
            <>
              <LectureViewer />
            </>
          )}
        />

        <PrivateRoute
          exact
          path={"/cms"}
          render={() =>
            adminUsers[0].find((user) => user.email === currentUser.email) ? (
              <>
                <CoachCMS />
              </>
            ) : (
              <>
                <Restricted />
              </>
            )
          }
        />
      </Switch>

      <PrivateRoute
        path="/"
        render={() => (
          <>
            <Footer />
          </>
        )}
      />
    </>
  );
}

export default App;
