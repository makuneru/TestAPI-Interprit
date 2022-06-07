interface UserFields {
  name?: string;
  job?: string;
}

export default class User {
  private UserFields: UserFields;

  private constructor(UserFields: UserFields) {
    this.UserFields = UserFields;
  }

  public UserData(): UserFields {
    return this.UserFields;
  }

  public getName(): UserFields['name'] {
    return this.UserFields.name;
  }

  public getJob(): UserFields['job'] {
    return this.UserFields.job;
  }

  static Builder = class {
    private UserFields: UserFields = {};

    public getUserData(): UserFields {
      return this.UserFields;
    }

    public getName(): UserFields['name'] {
      return this.UserFields.name;
    }

    public setName(name: UserFields['name']) {
      this.UserFields.name = name;
      return this;
    }

    public getJob(): UserFields['job']  {
      return this.UserFields.job;
    }

    public setJob(job:  UserFields['name']) {
      this.UserFields.job = job;
      return this;
    }

    public build() {
      return new User(this.UserFields);
    }
  };
}
