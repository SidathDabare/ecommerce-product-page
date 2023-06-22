/** @format */

import React, { useState } from "react"
import { Button, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "../redux/actions"

const MyNavbar = () => {
  const [showNavMenu, setShowNavMenu] = useState(false)
  const [showCartMenu, setShowCartMenu] = useState(false)
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart)
  console.log(cartItems.cart)
  return (
    <div className='my-navbar'>
      <Container className='navbar-div p-0'>
        <div className='nav-left d-flex align-items-center'>
          <div className='menu-icon col-1'>
            <img
              src='https://sidathdabare.github.io/ecommerce-product-page/images/icon-menu.svg'
              alt=''
              onClick={() => {
                setShowNavMenu(!showNavMenu)
                setShowCartMenu(!showCartMenu)
              }}
            />
          </div>
          <div className='nav-left-logo col-4'>
            <img src='/images/logo.svg' alt='logo' />
          </div>
          <div className='nav-left-links col-7 d-flex justify-content-between align-items-center'>
            <div className='nav-left-items'>
              <a href='/Collections'>Collections</a>
            </div>
            <div className='nav-left-items'>
              <a href='/men'>Men</a>
            </div>
            <div className='nav-left-items'>
              <a href='/women'>Women</a>
            </div>
            <div className='nav-left-items'>
              <a href='/about'>About</a>
            </div>
            <div className='nav-left-items'>
              <a href='/contact'>Contact</a>
            </div>
          </div>
        </div>
        <div className='nav-right'>
          <div
            className='nav-right-cart'
            onClick={() => setShowCartMenu(!showCartMenu)}>
            <img
              src='https://sidathdabare.github.io/ecommerce-product-page/images/icon-cart.svg'
              alt='cart'
            />
            {cartItems.cart.length === 0 ? null : (
              <span className='cart-number'>{cartItems.cart.length}</span>
            )}
          </div>
          <div
            className='nav-right-avatar'
            onClick={() => setShowCartMenu(!showCartMenu)}>
            <img
              src='https://sidathdabare.github.io/ecommerce-product-page/images/image-avatar.png'
              alt='avatar'
            />
          </div>

          <div className={showCartMenu ? "nav-right-hide" : "d-none"}>
            <div className='nav-right-hide-top'>
              <h6 className='py-3 px-3'>Cart</h6>
            </div>
            <div className='nav-right-hide-content'>
              {cartItems.cart.length > 0 ? (
                cartItems.cart.map((item, i) => (
                  <div
                    key={i}
                    className='nav-right-hide-content-item p-3 col-12'>
                    <img
                      className='nav-right-hide-content-item-img col-1'
                      src={item.image}
                      alt=''
                    />

                    <small className='nav-right-hide-content-item-info col-9 px-1'>
                      <span className='text-truncate'>{item.name}</span>
                      <br />
                      <span>
                        ${item.price} x {item.quantity}
                        {"    "}
                      </span>
                      <span className='fw-bold'>
                        ${item.price * item.quantity}
                      </span>
                    </small>

                    <img
                      className='col-1 trash-btn'
                      src='https://sidathdabare.github.io/ecommerce-product-page/images/icon-delete.svg'
                      alt=''
                      onClick={() => {
                        dispatch(removeFromCart(item))
                      }}
                    />
                  </div>
                ))
              ) : (
                <div
                  className='d-flex justify-content-center align-items-center'
                  style={{ height: "100px" }}>
                  <span> Your cart is empty.</span>
                </div>
              )}
            </div>
            <div className='nav-right-hide-btn d-grid gap-2 py-1 px-2'>
              <Button className='btn-block'>Checkout</Button>
            </div>
          </div>
        </div>
      </Container>
      <div className={showNavMenu ? "nav-menu-hide" : "d-none"}>
        <div className='nav-menu-hide-content'>
          <div className='nav-menu-hide-top'>
            <img
              src='https://sidathdabare.github.io/ecommerce-product-page/images/icon-close.svg'
              alt='close'
              onClick={() => setShowNavMenu(!showNavMenu)}
            />
          </div>
          <div className='nav-menu-hide-content-item'>
            <div className='nav-hide-items'>
              <a href='/collections'>Collections</a>
            </div>
            <div className='nav-hide-items'>
              <a href='/men'>Men</a>
            </div>
            <div className='nav-hide-items'>
              <a href='/women'>Women</a>
            </div>
            <div className='nav-hide-items'>
              <a href='/about'>About</a>
            </div>
            <div className='nav-hide-items'>
              <a href='/contact'>Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyNavbar
