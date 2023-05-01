import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/HomeArea/Home/Home";

function App(): JSX.Element {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;