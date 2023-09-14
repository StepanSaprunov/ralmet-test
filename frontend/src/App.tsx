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
import { useStore } from "effector-react";
import { $addCategoryDialogIsOpened, $editCategoryDialog } from "./stores/categories/categories";
import EditCategoryDialog from "./components/EditCategoryDialog/EditCategoryDialog";
import AddProductDialog from "./components/AddProductDialog/AddProductDialog";
import { $addProductDialogIsOpened } from "./stores/products/products";

function App() {

  setToken(localStorage.getItem("token"));
  if (localStorage.getItem("user")) {
    setUser(JSON.parse(localStorage.getItem("user") as string))
  };

  const addCategoryDialogIsOpened = useStore($addCategoryDialogIsOpened);
  const editCategoryDialog = useStore($editCategoryDialog);
  const addProductDialogIsOpened = useStore($addProductDialogIsOpened);

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
      <AddCategoryDialog open={addCategoryDialogIsOpened} />
      <EditCategoryDialog open={editCategoryDialog.isOpen} category={editCategoryDialog.category} />
      <AddProductDialog open={addProductDialogIsOpened} />
    </>
  )
}

export default App
