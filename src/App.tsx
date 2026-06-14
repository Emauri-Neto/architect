import { HashRouter, Routes, Route } from "react-router"
import HomePage from "./pages/Home";
import "./App.css";
import { ThemeProvider } from "./components/theme";

function App() {
  return <HashRouter>
    <ThemeProvider defaultTheme="dark" storageKey="architect-ui-theme">
      <Routes>
        <Route index path="/" element={<HomePage />} />
      </Routes>
    </ThemeProvider>
  </HashRouter>
}

export default App;
