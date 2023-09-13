import { User } from "src/models/users.model";

export class IRegistrationResponse {
  user: User;
  token: string;
}