import axios from 'axios';
import {
  ForbiddenException,
  UnauthorizedException,
  NoMappedAuthException
} from '@core/domain/exceptions/auth-exceptions';

export interface AuthUser {
  id: string;
  nome: string;
  email: string;
}

interface AuthResponse {
  user: AuthUser;
  message: string;
}

export class AuthService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.BASE_PATH_AUTH || 'http://localhost:3000/api/auth';
  }

  async validateToken(token: string): Promise<AuthUser> {
    try {
      const response = await axios.get<AuthResponse>(`${this.baseUrl}/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      });

      return response.data.user;
    } catch (error: any) {
      const status = error.response?.status;

      if (status === 401) {
        throw new UnauthorizedException('Invalid or expired token');
      } else if (status === 403) {
        throw new ForbiddenException('User does not have permission');
      } else {
        throw new NoMappedAuthException('Unexpected error validating token');
      }
    }
  }
}
