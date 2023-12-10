import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hangman from "./hangman/Hangman";
import Memory from "./memory/Memory";
import TypeSpeed from "./typeSpeed/TypeSpeed";
import { AuthWrapper, Games, Home, Results } from "./pages";
import { Header, Footer, Sidebar } from "./components";

function App() {
  return (
    <div className="App">
      <AuthWrapper>
        <BrowserRouter>
          <Header />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/games" element={<Games />} />
            <Route path="/hangman" element={<Hangman />} />
            <Route path="/memory" element={<Memory />} />
            <Route path="/typeSpeed" element={<TypeSpeed />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </AuthWrapper>
    </div>
  );
}

export default App;
