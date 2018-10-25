import React from 'react'

export default function () {
  return <form className="card p-2">
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Promo code"/>
      <div className="input-group-append">
        <button type="submit" className="btn btn-secondary">Redeem</button>
      </div>
    </div>
  </form>
}
