import './App.css';
import Signup from "./signup"
import SignInUser from './signin';
import PersistentDrawerLeft from './appbar';
import { useAuth } from "./useAuth";
import {Route, Routes} from "react-router-dom"
import Events from './event';
import PatientSignup from './patientsignup';



function App() {
 
  const {user} = useAuth();
  const notSignedInRoutes = (
    <>
      <Route path="/signup" element={ <Signup/> }/>
      <Route path="/*" element={ <SignInUser/> }/>
      <Route path="/patientsignup" element={<PatientSignup/>}/>
    </>
  )
  const signedInRoutes = (
    <>
      <Route path="/appbar" element={<PersistentDrawerLeft/>}/>
      <Route path="/event" element={<Events/>}/>
     
    </>
  );
  return (
    <div className="App">
      { user ? <PersistentDrawerLeft/> : <></> }
    <Routes>
      {
        user ? signedInRoutes : notSignedInRoutes
      }
    </Routes>
    </div>
  );
}

export default App;
