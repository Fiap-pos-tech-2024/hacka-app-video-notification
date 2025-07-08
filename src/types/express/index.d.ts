import { AuthUser } from '@adapter/driver/auth/authService'

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}
