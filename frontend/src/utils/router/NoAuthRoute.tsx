import { useStore } from "effector-react";
import { $user } from "../../stores/auth/auth";
import { Navigate, Outlet } from "react-router";

const NoAuthRoute = () => {
  const user = useStore($user);

  return (
    !user ? <Outlet /> : <Navigate to={"/"} />
  )
}

export { NoAuthRoute };