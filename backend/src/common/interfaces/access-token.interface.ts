import { User, UserResponse } from '@@nest/user/entities/user.entity';

export class AccessToken {
  name: string;
  email: string;
  sub: string;
  idToken: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpired: number;
  refreshTokenExpired: number;
  user: User;
  error: string;
  profile: UserResponse;
}
