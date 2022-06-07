interface RegistrationFields {
  email?: string;
  password?: string;
}
export default class Registration {
  private RegistrationFields: RegistrationFields;

  private constructor(RegistrationFields: RegistrationFields) {
      this.RegistrationFields = RegistrationFields;
  }

  public RegistrationData() : RegistrationFields {
      return this.RegistrationFields;
  }

  public getEmail() : RegistrationFields['email'] {
      return this.RegistrationFields.email = this.RegistrationFields.email;
  }
  
  public getPassword() : RegistrationFields['password'] {
      return this.RegistrationFields.password = this.RegistrationFields.password;
  }

  static Builder = class {
    private RegistrationFields : RegistrationFields = {};

    public getLoginData() : RegistrationFields {
      return this.RegistrationFields;
    }

    public getEmail() : RegistrationFields['email'] {
      return this.RegistrationFields.email = this.RegistrationFields.email;
    }

    public setEmail(email: RegistrationFields['email']) {
        this.RegistrationFields.email = email;
        return this;
    }

    public getPassword() : RegistrationFields['password'] {
      return this.RegistrationFields.password = this.RegistrationFields.password;
    }

    public setPassword(password: RegistrationFields['password']) {
        this.RegistrationFields.password = password;
        return this;
    }

    public build() {
      return new Registration(this.RegistrationFields);
    }
  }
}