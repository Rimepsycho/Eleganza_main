import { useState, useRef } from 'react'

function useFormFieldValidation(selectedShippingMethod, selectedPaymentMethod) {
  const shippingMethodRef = useRef()
  const paymentMethodRef = useRef()

  const numbeInput = useRef()
  const emailInput = useRef()
  const telInput = useRef()
  const nameInput = useRef()
  const cardNumberInput = useRef()
  const expiryInput = useRef()
  const cvvInput = useRef()
  const cityInput = useRef()
  const postalCodeInput = useRef()
  const streetInput = useRef()
  const nameOnCardInput = useRef()
  const billingAddressInput = useRef()
  const sameAsShippingInput = useRef()

  const validateFields = () => {
    // 檢查選擇的寄送方式是否為預設值
    if (shippingMethodRef.current.value === 'shipping-method') {
      alert('請選擇有效的寄送方式')
      return false
    }

    // 檢查選擇的付款方式是否為預設值
    if (paymentMethodRef.current.value === 'payment-method') {
      alert('請選擇有效的付款方式')
      return false
    }

    // 檢查姓名是否為空
    if (!nameInput.current.value.trim()) {
      alert('請輸入姓名')
      return false
    }

    // 檢查電子郵件是否為空並且是否符合格式
    if (!emailInput.current.value || !emailInput.current.validity.valid) {
      alert('請輸入有效的電子郵件地址')
      return false
    }

    // 檢查電話號碼是否為空並且是否符合格式
    if (!telInput.current.value || !telInput.current.validity.valid) {
      alert('請輸入有效的電話號碼（10位數字）')
      return false
    }

    // 檢查信用卡號是否為空並且格式正確
    if (selectedPaymentMethod === 'credit_card') {
      if (
        !cardNumberInput.current.value.trim() ||
        !cardNumberInput.current.validity.valid
      ) {
        alert('請輸入13至16位數字的信用卡號')
        return false
      }

      // 檢查有效期限是否為空並且格式正確
      if (
        !expiryInput.current.value.trim() ||
        !expiryInput.current.validity.valid
      ) {
        alert('請輸入有效的有效期限，格式為 MM/YY')
        return false
      }

      // 檢查安全碼是否為空並且格式正確
      if (!cvvInput.current.value.trim() || !cvvInput.current.validity.valid) {
        alert('請輸入3至4位數字的安全碼')
        return false
      }
    }

    return true
  }

  return {
    numbeInput,
    emailInput,
    telInput,
    nameInput,
    cardNumberInput,
    expiryInput,
    cvvInput,
    cityInput,
    postalCodeInput,
    streetInput,
    nameOnCardInput,
    billingAddressInput,
    sameAsShippingInput,
    validateFields,
    shippingMethodRef,
    paymentMethodRef,
  }
}

export default useFormFieldValidation
