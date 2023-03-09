export class UserNameDoesntExistError extends Error {
  constructor() {
    super('Username or password incorrect.');
    this.name = 'UserNameDoesntExistError';
  }
}
export class PasswordDoesntMatchError extends Error {
  constructor() {
    super('Password doesnt match error.');
    this.name = 'PasswordDoesntMatchError';
  }
}
