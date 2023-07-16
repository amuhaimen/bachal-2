import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "./pages/Message";
import RootLayout from "./components/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/bachal2" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="message" element={<Message />}></Route>
      </Route>
      <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
