import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Users } from "./pages/user";
import { Posts } from "./pages/posts";
import { Form } from "./pages/form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/user-posts" element={<Posts />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
