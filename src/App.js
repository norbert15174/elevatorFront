import './App.css';
import AuthContainer from './components/auth/authContainer';
import { Route, BrowserRouter } from "react-router-dom";
import Building from "./components/buildings/buildings";
import BuildingElevator from "./components/elevators/buildingElevator";
function App() {
  return (
    <BrowserRouter>
        <Route exact path="/">
        <AuthContainer>
        </AuthContainer>
        </Route>
        <Route exact path="/buildings">
          <Building></Building>
        </Route>
        <Route path="/:name/:id" component={BuildingElevator}/>
      </BrowserRouter>

  );
}

export default App;
