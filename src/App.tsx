import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import HomeContent from "./pages/Home";
import { ExperiencesPage } from "./components/ExperiencesPage";
import Guides from "./pages/Guides";
import About from "./pages/About";
import DestinationPage from "./pages/DestinationPage";

export default function App(){
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/experiences" element={<ExperiencesPage user={null} destinations={[]} onBack={()=>{}} />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/about" element={<About />} />
        <Route path="/destinations/:id" element={<DestinationPage />} />
      </Routes>
    </div>
  );
}
