import React, { useCallback } from "react";
import styles from "./NavBar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "effector-react";
import { $user, setToken, setUser } from "../../stores/auth/auth";
import { Button, Stack } from "@mui/material";

const NavBar = () => {
  const user = useStore($user);
  const navigate = useNavigate();

  const signOutClickHandler = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  }, [])

  return (
    <nav className={styles.navBar}>
      <div className={styles.navBarItem}>
        <Stack spacing={2} direction="row">
          <Link to={"/products"}><Button variant="text">Products</Button></Link>
          <Link to={"/categories"}><Button variant="text">Categories</Button></Link>
        </Stack>
      </div>
      <div className={styles.navBarItem}>
        {user
          ? <Stack spacing={2} direction="row">
            <Button variant="text">{user.username}</Button>
            <Button variant="contained" onClick={signOutClickHandler}>Sign Out</Button>
          </Stack>
          : <Stack spacing={2} direction="row">
            <Link to={"/registration"}>
              <Button variant="outlined">Sign Up</Button>
            </Link>
            <Link to={"/login"}>
              <Button variant="contained">Sign In</Button>
            </Link>
          </Stack>
        }
      </div>
    </nav>
  )
}

export default React.memo(NavBar);