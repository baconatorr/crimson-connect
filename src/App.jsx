import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./components/Sign In/SignIn";
import Homework from "./components/Homework/Homework";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sign In Page */}
        <Route path="/" element={<SignIn />} />
        {/* HW Page */}
        <Route path="/homework" element={<Homework />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
