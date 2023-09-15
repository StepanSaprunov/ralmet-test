import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage";
import { PrivateRoute } from "./utils/router/PrivateRoute";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import { setToken, setUser } from "./stores/auth/auth";
import { NoAuthRoute } from "./utils/router/NoAuthRoute";
import HomePage from "./pages/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import styles from "./App.module.scss";
import AddCategoryDialog from "./components/AddCategoryDialog/AddCategoryDialog";
import EditCategoryDialog from "./components/EditCategoryDialog/EditCategoryDialog";
import AddProductDialog from "./components/AddProductDialog/AddProductDialog";
import EditProductDialog from "./components/EditProductDialog/EditProductDialog";

function App() {

  setToken(localStorage.getItem("token"));
  if (localStorage.getItem("user")) {
    setUser(JSON.parse(localStorage.getItem("user") as string))
  };

  return (
    <>
      <NavBar />
      <div className={styles.appContainer}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Route>
          <Route element={<NoAuthRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="registration" element={<RegistrationPage />} />
          </Route>
        </Routes>
      </div>
      <AddCategoryDialog />
      <EditCategoryDialog />
      <AddProductDialog />
      <EditProductDialog />
    </>
  )
}

export default App
