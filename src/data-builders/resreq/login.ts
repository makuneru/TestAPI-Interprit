interface LoginFields {
  email?: string;
  password?: string;
}

export default class Login {
  private LoginFields: LoginFields;

  private constructor(LoginFields: LoginFields) {
      this.LoginFields = LoginFields;
  }

  public LoginData() : LoginFields {
      return this.LoginFields;
  }

  public getEmail() : LoginFields['email'] {
      return this.LoginFields.email = this.LoginFields.email;
  }
  
  public getPassword() : LoginFields['password'] {
      return this.LoginFields.password = this.LoginFields.password;
  }

  static Builder = class {
    private LoginFields : LoginFields = {};

    public getLoginData() : LoginFields {
      return this.LoginFields;
    }

    public getEmail() : LoginFields['email'] {
      return this.LoginFields.email = this.LoginFields.email;
    }

    public setEmail(email: LoginFields['email']) {
        this.LoginFields.email = email;
        return this;
    }

    public getPassword() : LoginFields['password'] {
      return this.LoginFields.password = this.LoginFields.password;
    }

    public setPassword(password: LoginFields['password']) {
        this.LoginFields.password = password;
        return this;
    }

    public build() {
      return new Login(this.LoginFields);
    }
  }
}