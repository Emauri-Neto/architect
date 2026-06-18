import { HashRouter, Routes, Route } from "react-router"
import HomePage from "./pages/Home";
import "./App.css";
import { ThemeProvider } from "./components/theme";
import CharactersPage from "./pages/character/Characters";
import CreateCharPage from "./pages/character/create";

function App() {
  return <HashRouter>
    <ThemeProvider defaultTheme="dark" storageKey="architect-ui-theme">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/new" element={<CreateCharPage />} />
      </Routes>
    </ThemeProvider>
  </HashRouter>
}

export default App;
