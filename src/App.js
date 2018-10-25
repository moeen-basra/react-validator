import React, { Component } from 'react'
// components
import Cart from './components/Cart'
import CouponFrom from './components/CouponFrom'
import BillingForm from './components/BillingFrom'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout form</h2>
          <p className="lead">Below is an example form built entirely with Bootstrap's form controls. Each required
            form group has a validation state that can be triggered by attempting to submit the form without
            completing it.</p>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>

            <Cart/>
            <CouponFrom/>

          </div>
          <BillingForm/>
        </div>

        <Footer/>
      </div>
    )
  }
}

export default App
