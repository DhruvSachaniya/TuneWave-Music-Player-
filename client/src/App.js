import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBase from "./components/App/AppComponents";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppBase/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
