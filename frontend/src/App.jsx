import { Routes, Route } from "react-router-dom";
import Notepad from "./Notepad";

function App() {
  return (
    <Routes>
      <Route path="/:filename" element={<Notepad />} />
    </Routes>
  );
}

export default App;