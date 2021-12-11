export class User {
  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  private _id!: number;
  private _username!: string;
  private _password!: string;
  private _firstName!: string;
  private _lastName!: string;
  private _token!: string;

  set id(value: number) {
    this._id = value;
  }

  set username(value: string) {
    this._username = value;
  }

  set password(value: string) {
    this._password = value;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  set lastName(value: string) {
    this._lastName = value;
  }
  get id(): number {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  public User(id: number, username: string, password: string, firstName: string, lastName: string) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._firstName = firstName;
    this._lastName = lastName;
  }
}
