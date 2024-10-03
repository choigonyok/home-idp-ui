import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Test from "./Test";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Test/>}></Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;