import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../../auth/authService'
import { UnauthorizedException } from '@core/domain/exceptions/auth-exceptions'

const authService = new AuthService()

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const user = await authService.validateToken(token)
    if (!user) throw new UnauthorizedException()

    req.user = user
    next()
  } catch (err: any) {
    return res.status(err.statusCode || 401).json({ error: err.message || 'Unauthorized' })
  }
}
