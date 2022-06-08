import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SimpleTabs from "./registratioon/components/SimpleTabs";
import { CREATE_POST_PAGE_URL_PATH, DETAILS_POST_PAGE_URL_PATH, MAP_PAGE_URL_PATH, PROFILE_PAGE_URL_PATH, USER_PAGE_URL_PATH, VIEW_FAVORITE_POSTS_URL_PATH } from "./registratioon/config";
import CreatePostPage from "./registratioon/pages/CreatePostPage";
import DetailsPostPage from "./registratioon/pages/DetailsPostPage";
import ListPostsFavoritePage from "./registratioon/pages/ListPostsFavoritePage";
import ListPostsPage from "./registratioon/pages/ListPostsPage";
import LogoutPage from "./registratioon/pages/LogoutPage";
import MapViewPage from "./registratioon/pages/MapViewPage";
import ProfilePage from "./registratioon/pages/ProfilePage";
import SignUpPage from "./registratioon/pages/SignUpPage";
import UserProfilePage from "./registratioon/pages/UserProfilePage";
import ProtectedRoute from "./registratioon/ProtectedRoute";

/**
 * Renders the PS UI.
 */
function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/sign-up">
          <SignUpPage />
        </Route>

        <Route exact path="/">
          <SimpleTabs />
        </Route>

        <Route exact path="/logout">
          <LogoutPage />
        </Route>

        <Route exact path={MAP_PAGE_URL_PATH}>
          <MapViewPage />
        </Route>


        <ProtectedRoute
          key={DETAILS_POST_PAGE_URL_PATH}
          path={DETAILS_POST_PAGE_URL_PATH}
          component={DetailsPostPage}
        />
      <ProtectedRoute
          key={VIEW_FAVORITE_POSTS_URL_PATH}
          path={VIEW_FAVORITE_POSTS_URL_PATH}
          component={ListPostsFavoritePage}
        />
        <ProtectedRoute
          key={PROFILE_PAGE_URL_PATH}
          path={PROFILE_PAGE_URL_PATH}
          component={ProfilePage}
        />
        <ProtectedRoute
          key={USER_PAGE_URL_PATH}
          path={USER_PAGE_URL_PATH}
          component={UserProfilePage}
        />
        <ProtectedRoute
          key={CREATE_POST_PAGE_URL_PATH}
          path={CREATE_POST_PAGE_URL_PATH}
          component={CreatePostPage}
        />
      </Switch>
    </Router>
  );
}

export default App;