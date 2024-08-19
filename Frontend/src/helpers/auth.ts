import { jwtDecode, JwtPayload } from "jwt-decode";
import { getState } from "../store/store";

interface DecodedToken extends JwtPayload {
  sub: string;
  role: string;
}

function transformToken(token: any): DecodedToken {
  return {
    ...token,
    role: token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
  };
}

function decodeAndTransformToken(token: string): DecodedToken {
  const decoded = jwtDecode<JwtPayload>(token);
  return transformToken(decoded);
}

const isAdmin = (): boolean => {
  const token = getState().token.token;
  if (!token) return false;

  const decodedToken = decodeAndTransformToken(token);
  return decodedToken.role === "Admin" && !isTokenExpired(decodedToken);
};

const isTokenExpired = (token: DecodedToken): boolean => {
  const currentTime = Date.now() / 1000;

  if (token.exp && token.exp > currentTime) return false;
  else {
    return true;
  }
};

// Validation will need to be altered at a later data.

export { isAdmin, isTokenExpired };
