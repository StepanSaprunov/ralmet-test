import React from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.loginPageContainer}>
      <LoginForm />
    </div>
  )
}

export default React.memo(LoginPage);