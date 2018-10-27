import React from 'react'
import withValidator from '../hoc/withValidator'
import type { ErrorBag } from 'ree-validate'

type Props = {
  validate: Function,
  errors: ErrorBag,
}

type State = {
  firstName: ?string,
  lastName: ?string,
  username: ?string,
  email: ?string,
  address: ?string,
  address2: ?string,
  country: ?string,
  state: ?string,
  zip: ?number,
  sameAddress: boolean,
  saveInformation: boolean,
  paymentMethod: ?string,
  ccName: ?string,
  ccNumber: ?number,
  ccExpiry: ?string,
  ccCode: ?number,
}

class BillingFrom extends React.Component<Props, State> {

  state = {
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    address: null,
    address2: null,
    country: null,
    state: null,
    zip: null,
    sameAddress: false,
    saveInformation: false,
    paymentMethod: null,
    ccName: null,
    ccNumber: null,
    ccExpiry: null,
    ccCode: null,
  }

  handleChange = (name: string, value: string) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.validate(this.state)
      .then(isValid => isValid && this.submit())
  }

  submit () {
    console.log(this.state)
  }

  render () {
    const { errors } = this.props

    return <div className="col-md-8 order-md-1">
      <h4 className="mb-3">Billing address</h4>
      <form className="needs-validation" onSubmit={e => this.handleSubmit(e)}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName">First name</label>
            <input type="text"
                   className={`form-control ${errors.has('firstName') && 'is-invalid'}`}
                   id="firstName"
                   name="firstName"
                   placeholder=""
                   value={this.state.firstName || ''}
                   onChange={(e) => this.handleChange(e.target.name, e.target.value)}/>
            {errors.has('firstName') && <div className="invalid-feedback">{errors.first('firstName')}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName">Last name</label>
            <input type="text"
                   className={`form-control ${errors.has('lastName') && 'is-invalid'}`}
                   id="lastName"
                   name="lastName"
                   placeholder=""
                   value={this.state.lastName || ''}
                   onChange={(e) => this.handleChange(e.target.name, e.target.value)}/>
            {errors.has('lastName') && <div className="invalid-feedback">{errors.first('lastName')}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">@</span>
            </div>
            <input type="text"
                   className={`form-control ${errors.has('username') && 'is-invalid'}`}
                   id="username"
                   name="username"
                   placeholder="Username"
                   value={this.state.username || ''}
                   onChange={(e) => this.handleChange(e.target.name, e.target.value)}/>
            {errors.has('username') && <div className="invalid-feedback">{errors.first('username')}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
          <input type="email"
                 className="form-control"
                 id="email"
                 name="email"
                 placeholder="you@example.com"
                 value={this.state.email || ''}
                 onChange={(e) => this.handleChange(e.target.name, e.target.value)}/>
          <div className="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="address">Address</label>
          <input type="text"
                 className="form-control"
                 id="address"
                 name="address"
                 placeholder="1234 Main St"
                 value={this.state.address || ''}
                 onChange={(e) => this.handleChange(e.target.name, e.target.value)}/>
          <div className="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
          <input type="text"
                 className="form-control"
                 id="address2"
                 name="address2"
                 placeholder="Apartment or suite"
                 value={this.state.address2 || ''}
                 onChange={(e) => this.handleChange(e.target.name, e.target.value)}/>
        </div>

        <div className="row">
          <div className="col-md-5 mb-3">
            <label htmlFor="country">Country</label>
            <select className="custom-select d-block w-100"
                    id="country"
                    name="country"
                    value={this.state.country || ''}
                    onChange={(e) => this.handleChange(e.target.name, e.target.value)}
            >
              <option value="">Choose...</option>
              <option>United States</option>
            </select>
            <div className="invalid-feedback">
              Please select a valid country.
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="state">State</label>
            <select className="custom-select d-block w-100"
                    id="state"
                    name="state"
                    value={this.state.state || ''}
                    onChange={(e) => this.handleChange(e.target.name, e.target.value)}
            >
              <option value="">Choose...</option>
              <option>California</option>
            </select>
            <div className="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="zip">Zip</label>
            <input type="text"
                   className="form-control"
                   id="zip"
                   name="zip"
                   placeholder=""
                   value={this.state.zip || ''}
                   onChange={(e) => this.handleChange(e.target.name, e.target.value)}
            />
            <div className="invalid-feedback">
              Zip code required.
            </div>
          </div>
        </div>
        <hr className="mb-4"/>
        <div className="custom-control custom-checkbox">
          <input type="checkbox"
                 className="custom-control-input"
                 id="same-address"
                 name="sameAddress"
                 checked={this.state.sameAddress}
                 onChange={() => this.setState({ sameAddress: !this.state.sameAddress })}/>
          <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my
            billing address</label>
        </div>
        <div className="custom-control custom-checkbox">
          <input type="checkbox"
                 className="custom-control-input"
                 id="save-info"
                 name="saveInformation"
                 checked={this.state.saveInformation}
                 onChange={() => this.setState({ saveInformation: !this.state.saveInformation })}/>
          <label className="custom-control-label" htmlFor="save-info">Save this information for next
            time</label>
        </div>
        <hr className="mb-4"/>

        <h4 className="mb-3">Payment</h4>

        <div className="d-block my-3">
          <div className="custom-control custom-radio">
            <input id="credit"
                   name="paymentMethod"
                   type="radio"
                   className="custom-control-input"
                   checked={this.state.paymentMethod === 'cc'}
                   onChange={(e) => {
                     this.handleChange(e.target.name, 'cc')
                   }}
            />
            <label className="custom-control-label" htmlFor="credit">Credit card</label>
          </div>
          <div className="custom-control custom-radio">
            <input id="debit"
                   name="paymentMethod"
                   type="radio"
                   className="custom-control-input"
                   checked={this.state.paymentMethod === 'dc'}
                   onChange={(e) => this.handleChange(e.target.name, 'dc')}
            />
            <label className="custom-control-label" htmlFor="debit">Debit card</label>
          </div>
          <div className="custom-control custom-radio">
            <input id="paypal"
                   name="paymentMethod"
                   type="radio"
                   className="custom-control-input"
                   checked={this.state.paymentMethod === 'paypal'}
                   onChange={(e) => this.handleChange(e.target.name, 'paypal')}
            />
            <label className="custom-control-label" htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-name">Name on card</label>
            <input type="text"
                   className="form-control"
                   id="cc-name"
                   name="ccName"
                   placeholder=""
                   value={this.state.ccName || ''}
                   onChange={(e) => this.handleChange(e.target.name, e.target.value)}
            />
            <small className="text-muted">Full name as displayed on card</small>
            <div className="invalid-feedback">
              Name on card is required
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-number">Credit card number</label>
            <input type="text"
                   className="form-control"
                   id="cc-number"
                   name="ccNumber"
                   placeholder=""
                   value={this.state.ccNumber || ''}
                   onChange={(e) => this.handleChange(e.target.name, e.target.value)}
            />
            <div className="invalid-feedback">
              Credit card number is required
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label htmlFor="cc-expiration">Expiration</label>
            <input type="text"
                   className="form-control"
                   id="cc-expiration"
                   name="ccExpiry"
                   placeholder=""
                   value={this.state.ccExpiry || ''}
                   onChange={(e) => this.handleChange(e.target.name, e.target.value)}
            />
            <div className="invalid-feedback">
              Expiration date required
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="cc-cvv">CVV</label>
            <input type="text"
                   className="form-control"
                   id="cc-cvv"
                   name="ccCode"
                   placeholder=""
                   value={this.state.ccCode || ''}
                   onChange={(e) => this.handleChange(e.target.name, e.target.value)}
            />
            <div className="invalid-feedback">
              Security code required
            </div>
          </div>
        </div>
        <hr className="mb-4"/>
        <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
      </form>
    </div>
  }
}

export default withValidator(BillingFrom, [
  {
    name: 'firstName',
    rules: 'required',
    alias: 'First Name',
  },
  {
    name: 'lastName',
    rules: 'required',
    alias: 'Last Name',
  },
  {
    name: 'username',
    rules: 'required',
    alias: 'Username',
  },
])
