/** @format */

import React, { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import data from "../data.json"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../redux/actions"

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(data.images[0])
  const [cartItems, setCartItems] = useState(0)
  const [showModel, setShowModel] = useState(false)

  const cartItemsArr = useSelector((state) => state.cart)
  console.log(cartItemsArr.cart.length)

  const dispatch = useDispatch()

  const setImage = (image) => {
    setSelectedImage(image)
  }
  const goToPreviousImg = () => {
    const index = data.images.indexOf(selectedImage)
    if (index === 0) {
      setSelectedImage(data.images[data.images.length - 1])
    } else {
      setSelectedImage(data.images[index - 1])
    }
  }
  const goToNextImg = () => {
    const index = data.images.indexOf(selectedImage)
    if (index === data.images.length - 1) {
      setSelectedImage(data.images[0])
    } else {
      setSelectedImage(data.images[index + 1])
    }
  }
  const decreseItem = () => {
    if (cartItems > 0) {
      setCartItems(cartItems - 1)
    }
  }
  const increseItem = () => {
    setCartItems(cartItems + 1)
  }
  const product = {
    id: cartItemsArr.cart.length + 1,
    name: data.name,
    price: ((data.price * data.discount) / 100).toFixed(2),
    image: selectedImage.src,
    quantity: cartItems,
  }
  useEffect(() => {}, [selectedImage])
  return (
    <>
      <div className={showModel ? "product-model" : "product-model-hide"}>
        <div className='product-model-content'>
          <div className='product-model-section01'>
            <img
              src='/images/icon-close.svg'
              alt='close'
              onClick={() => setShowModel(!showModel)}
            />
          </div>
          <div className='product-model-section02'>
            <div className='previous-div'>
              <img
                src='/images/icon-previous.svg'
                alt='next'
                onClick={goToPreviousImg}
              />
            </div>
            <img
              src={selectedImage.src}
              alt='product'
              onClick={() => setShowModel(!showModel)}
            />
            <div className='next-div'>
              <img
                src='/images/icon-next.svg'
                alt='next'
                onClick={goToNextImg}
              />
            </div>
          </div>
          <div className='product-model-section03'>
            {data.images.map((image, i) => (
              <div key={image.id} className='product-page-left-bottom-item'>
                <img
                  src={image.src}
                  alt='product'
                  onClick={() => setImage(image)}
                />

                <div
                  className={
                    selectedImage.id === image.id
                      ? "image-overlay-active"
                      : "image-overlay"
                  }></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Container className='product-page'>
        <div className='product-page-left'>
          <div className='product-page-left-top'>
            <div className='product-page-left-top-item'>
              <div className='previous-div'>
                <img
                  src='/images/icon-previous.svg'
                  alt='next'
                  onClick={goToPreviousImg}
                />
              </div>
              <img
                src={selectedImage.src}
                alt='product'
                onClick={() => setShowModel(!showModel)}
              />
              <div className='next-div'>
                <img
                  src='/images/icon-next.svg'
                  alt='next'
                  onClick={goToNextImg}
                />
              </div>
            </div>
          </div>
          <div className='product-page-left-bottom'>
            {data.images.map((image, i) => (
              <div key={image.id} className='product-page-left-bottom-item'>
                <img
                  src={image.src}
                  alt='product'
                  onClick={() => setImage(image)}
                />

                <div
                  className={
                    selectedImage.id === image.id
                      ? "image-overlay-active"
                      : "image-overlay"
                  }></div>
              </div>
            ))}
          </div>
        </div>
        <div className='product-page-right'>
          <div className='product-page-right-content'>
            <small className='company-name py-2'>
              {data.company.toUpperCase()}
            </small>
            <h1 className='product-name fw-bold py-2'>{data.name}</h1>
            <p className='company-desc'>{data.description}</p>
            <div className='d-flex align-items-center product-price'>
              <h4 className='fw-bold'>
                ${((data.price * data.discount) / 100).toFixed(2)}
              </h4>
              <h6 className='px-3'>{data.discount}%</h6>
            </div>
            <div className='product-real-price'>
              <small className='company-name'>${data.price}</small>
            </div>
            <div className='quantity-div d-flex align-items-center justify-content-between col-12'>
              <div className='quantity col-3'>
                <img
                  src='/images/icon-minus.svg'
                  alt='minus'
                  onClick={decreseItem}
                />
                <span className='fw-bold'>{cartItems}</span>
                <img
                  src='/images/icon-plus.svg'
                  alt='plus'
                  onClick={increseItem}
                />
              </div>

              <Button
                disabled={cartItems === 0 ? true : false}
                className='add-to-cart d-flex align-items-center justify-content-center px-4 col-6'
                onClick={() => {
                  dispatch(addToCart(product))
                  setCartItems(0)
                }}>
                <img src='/images/icon-cart-white.svg' alt='' />
                <span className='px-4'>Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ProductPage
