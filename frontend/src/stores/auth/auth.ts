import { createStore, createEffect, createEvent } from "effector";
import { ILogin, ILoginResponse, IUser } from "./types";
import { instanceAuth } from "../../utils/axios";

const $user = createStore<IUser | null>(null);
const $token = createStore<string | null>(null);

const setToken = createEvent<string | null>();
$token.on(setToken, (_, payload) => payload);

const setUser = createEvent<IUser | null>();
$user.on(setUser, (_, payload) => payload);

const loginFX = createEffect(async (loginData: ILogin): Promise<ILoginResponse> => {
  const response = await instanceAuth.post('/auth/login', loginData);
  return response.data;
});

const $isLoginRequestProcessing = createStore<boolean>(false);
const $isRegistrationRequestProcessing = createStore<boolean>(false);

$user.on(loginFX.doneData, (_, payload) => payload.user);
$isLoginRequestProcessing.on(loginFX.done, () => false);
$isLoginRequestProcessing.on(loginFX.pending, () => true);
$user.on(loginFX.fail, () => null);
$token.on(loginFX.doneData, (_, payload) => payload.token);
$token.on(loginFX.fail, () => null);

const registrationFX = createEffect(async (registrationData: ILogin): Promise<ILoginResponse> => {
  const response = await instanceAuth.post('/auth/registration', registrationData);
  return response.data;
});

$user.on(registrationFX.doneData, (_, payload) => payload.user);
$isRegistrationRequestProcessing.on(registrationFX.done, () => false);
$isRegistrationRequestProcessing.on(registrationFX.pending, () => true);
$user.on(registrationFX.fail, () => null);
$token.on(registrationFX.doneData, (_, payload) => payload.token);
$token.on(registrationFX.fail, () => null);

export {
  $user,
  $token,
  loginFX,
  registrationFX,
  $isRegistrationRequestProcessing,
  $isLoginRequestProcessing,
  setToken,
  setUser
};