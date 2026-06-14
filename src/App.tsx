import { HashRouter, Routes, Route } from "react-router"
import HomePage from "./pages/Home";
import "./App.css";

function App() {
  return <HashRouter>
    <Routes>
      <Route index path="/" element={<HomePage/>}/>
    </Routes>
  </HashRouter>
}

export default App;
