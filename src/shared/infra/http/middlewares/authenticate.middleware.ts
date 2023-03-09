import { authService } from '../../../../modules/users/services';

export const isAuthenticated = () => {
  return async (req: any, res: any, next: any) => {
    const token = req.headers['authorization'];
    if (token) {
      const decoded = await authService.decodeJWT(token);
      const signatureFailed = !decoded;

      if (signatureFailed) {
        res.status(403);
        res.json({
          error: {
            message: 'No access token provided'
          }
        });
        return res;
      }
      // See if the token was found
      const { username } = decoded;
      const tokens = await authService.getTokens(username);

      // if the token was found, just continue the request.
      if (tokens.length !== 0) {
        req.decoded = decoded;
        return next();
      }
      else {
        res.status(403);
        res.json({
          error: {
            message: 'Auth token not found. User is probably not logged in. Please login again.'
          }
        });
        return res;
      }
    }
    else {
      res.status(403);
      res.json({
        error: {
          message: 'No access token provided'
        }
      });
    }

  };
};