import { AccessToken } from '@@nest/common/interfaces/access-token.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UtilityService {
  constructor(private readonly jwtService: JwtService) {}

  getBearerToken(authorizationHeader: string): string {
    return authorizationHeader.replace('Bearer ', '');
  }

  decodeJwt(bearerToken: string): AccessToken {
    const accessToken: string = this.jwtService.decode(bearerToken);
    return JSON.parse(JSON.stringify(accessToken));
  }
}
