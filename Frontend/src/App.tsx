import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/HomeArea/Home/Home";
import Login from "./Components/AuthArea/Login/Login";
import Register from "./Components/AuthArea/Register/Register";

function App(): JSX.Element {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;