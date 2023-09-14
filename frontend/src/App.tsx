import { Route, Routes } from "react-router"
import LoginPage from "./pages/LoginPage/LoginPage"
import { PrivateRoute } from "./utils/router/PrivateRoute"
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"
import { setToken, setUser } from "./stores/auth/auth"
import { NoAuthRoute } from "./utils/router/NoAuthRoute"

function App() {

  setToken(localStorage.getItem("token"));
  if (localStorage.getItem("user")) {
    setUser(JSON.parse(localStorage.getItem("user") as string))
  };

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" />
        </Route>
        <Route element={<NoAuthRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
