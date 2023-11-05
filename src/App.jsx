import { RouterProvider } from "react-router-dom";

import router from "./router";

function App() {
  return <RouterProvider router={router} fallbackElement={null} />;
}

export default App;
