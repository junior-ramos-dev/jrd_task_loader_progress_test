import { BaseRepository } from "./axios/baseRepository";

export interface IUser {
  id: string;
  email: string;
  password: string;
}

export type User = Omit<IUser, "password">;

export type IRegisterRequest = Omit<IUser, "id">;

class AuthRepository extends BaseRepository<User, IRegisterRequest> {
  register = (req: IRegisterRequest) => {
    return this.post(req);
  };
}

export default AuthRepository;
