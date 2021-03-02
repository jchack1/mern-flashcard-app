import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import AminoAcidFlashcard from "./components/flashcards/AminoAcidFlashcard";
import FunctionalGroupsFlashcard from "./components/flashcards/FunctionalGroupsFlashcard";
import BiologyFlashcard from "./components/flashcards/BiologyFlashcard";
import PhysicsFlashcard from "./components/flashcards/PhysicsFlashcard";

const App = () => {
  return (
    <Router>
      <div className="container justify-center" style={{ margin: "0 auto" }}>
        <Switch>
          <Route exact path="/phys" render={() => <PhysicsFlashcard />} />

          <Route exact path="/bio" render={() => <BiologyFlashcard />} />
          <Route
            exact
            path="/organic-chem"
            render={() => <FunctionalGroupsFlashcard />}
          />
          <Route
            exact
            path="/amino-acids"
            render={() => <AminoAcidFlashcard />}
          />
          <Route exact path="/" render={() => <HomePage />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
