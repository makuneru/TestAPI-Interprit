/**
 * @description: URL parameters to be sent with the request
 * NOTE: params that are null or undefined are not rendered in the URL.
 *
 * @author Mac Cayanan <macnel.cayanan@oracle.com>
 * @since 03/30/2022
 */

interface ParamsFields {
  page?: number;
}

export default class Params {
  private ParamsFields: ParamsFields;

  private constructor(ParamsFields: ParamsFields) {
    this.ParamsFields = ParamsFields;
  }

  public ParamData() : ParamsFields {
    return this.ParamsFields;
  }

  public getPage(): ParamsFields['page'] {
    return this.ParamsFields.page;
  }

  static Builder = class {
    private ParamsFields : ParamsFields = {};

    public getPage(): ParamsFields['page'] {
      return this.ParamsFields.page;
    }

    public setPage(page: ParamsFields['page']) {
      this.ParamsFields.page = page;
      return this;
    }

    public build() {
      return new Params(this.ParamsFields);
    }
  };
}
