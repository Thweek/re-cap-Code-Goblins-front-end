import React, { useContext } from "react";
import "./App.css";
// import "antd/dist/antd.css";
import { Layout } from "antd";
// import { Input } from "antd";
// import socLogo from "../../soc-logo.png";
import VideoSelectionPage from "../VideoSelectionPage";
import LectureViewer from "../LectureViewer";
import CoachCMS from "../CoachCMS";
import HeaderBar from "../HeaderBar";
import Login from "../Login";
import PrivateRoute from "../PrivateRoute";
import Restricted from "../Restricted";

import { Route, Switch } from "react-router-dom";
import { AuthContext } from "../../firebase/Auth";
import { AdminUsersContext } from "../../contexts/adminUsersContext";

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

const { Footer, Content } = Layout;

function App() {
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);

  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />

        <PrivateRoute
          exact
          path="/"
          render={() => (
            <>
              <HeaderBar />
              <VideoSelectionPage />
            </>
          )}
        />

        <PrivateRoute
          exact
          path={"/videoviewer/:id"}
          render={() => <LectureViewer />}
        />

        <PrivateRoute
          exact
          path={"/cms"}
          render={() =>
            adminUsers[0].find((user) => user.email === currentUser.email) ? (
              <CoachCMS />
            ) : (
              <Restricted />
            )
          }
        />
      </Switch>
    </div>
  );
}

export default App;