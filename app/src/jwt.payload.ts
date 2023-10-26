export interface JwtPayload {
  username: string;
  sub: string; // _idを含めることでユーザーを特定
}
