import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./pages/chat";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="chat" element={<Chat />} />
    </>
  )
);

export default router;
