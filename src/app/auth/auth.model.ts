import { User } from "@models/user";

export interface AuthState {
  token?: string;
  user: User | null;
}
