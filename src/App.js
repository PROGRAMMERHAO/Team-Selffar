import './App.css';
import Signup from "./signup"
import SignInUser from './signin';
import PersistentDrawerLeft from './appbar';
import { useAuth } from "./useAuth";
import {Route, Routes} from "react-router-dom"
import useNavigate from "react-router-dom"



function App() {
  const{user} = useAuth();
  return (
    <div className="App">
     {user? <PersistentDrawerLeft/>: <SignInUser/>}
<Routes>
  <Route path="/appbar" element={<PersistentDrawerLeft/>}/>
  <Route path="/signup" element={<Signup/>}/>
</Routes>
    </div>
  );
}

export default App;
