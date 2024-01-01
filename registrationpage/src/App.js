import { useState } from "react";
import "./App.css";
import ImageSection from "./ImageSection";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  const [login, setLogin] = useState(false);
  return (
    <div className="App">
      <ImageSection />
      {login ? <Login setLogin={setLogin} /> : <Signup setLogin={setLogin} />}
    </div>
  );
}

export default App;
