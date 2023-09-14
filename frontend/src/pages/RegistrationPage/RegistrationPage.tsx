import React from "react";
import styles from "./RegistrationPage.module.scss";
import { RegistrationForm } from "../../components/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className={styles.registrationPageContainer}>
      <RegistrationForm />
    </div>
  )
}

export default React.memo(RegistrationPage);