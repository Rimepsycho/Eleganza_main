import animation from '../CSS/animation.module.css'
import pageCart from '../CSS/page_cart.module.css'
import pageCheckOut from '../CSS/page_check_out.module.css'
import pageComplete from '../CSS/page_complete.module.css'

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('same-as-shipping')
    const billingAddress = document.getElementById('billing-address')

    if (checkbox) {
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          billingAddress.classList.add('collapsed')
        } else {
          billingAddress.classList.remove('collapsed')
        }
      })
    }

    const select = document.getElementById('shipping-method')
    const details = document.getElementById('home-delivery-details')

    if (select) {
      select.addEventListener('change', function () {
        if (select.value === 'home_delivery') {
          details.classList.remove('collapsed')
        } else {
          details.classList.add('collapsed')
        }
      })
    }

    const paymentMethod = document.getElementById('payment-method')
    const creditCardDetails = document.getElementById('credit-card-details')

    if (paymentMethod) {
      paymentMethod.addEventListener('change', function () {
        if (paymentMethod.value === 'credit_card') {
          creditCardDetails.classList.remove('collapsed')
        } else {
          creditCardDetails.classList.add('collapsed')
        }
      })
    }

    
    const animateButton = document.getElementById('#animateBtn')

    const pageCartClassName = `${pageCart['page-cart']}`
    const pagecart = document.querySelector(`.${pageCartClassName}`)

    //  const justifycontentbetween = document.querySelector('#justify-content-between');  首頁的

    const checkoutClassName = `${pageCheckOut['check-out']}`
    const checkout = document.querySelector(`.${checkoutClassName}`)

    //  const footerContainer = document.querySelector('.footer-container'); 最下面的
    const dflex = document.querySelector('#d-flex')

    const progressBarClassName = `${pageCart['progress-bar']}`
    const progressBar = document.querySelector(`.${progressBarClassName}`)

    if (animateButton) {
      animateButton.addEventListener('click', function () {
        checkout.classList.remove(animation.hidden)
        //  footerContainer.classList.remove('fcpt');

        setTimeout(function () {
          pagecart.classList.add(animation['checkout-slide-left'])
          pagecart.classList.add(animation['checkout-slide-right'])
          pagecart.classList.add(animation['checkout-slide-up'])
          //  justifycontentbetween.classList.add('checkout-slide-left-down');
        }, 0)

        setTimeout(function () {
          checkout.classList.add(animation['checkout-position'])
          pagecart.classList.add(animation['pagecart-dpn'])
        }, 250)

        progressBar.style.width = '55%'
        progressBar.setAttribute('aria-valuenow', '55')
      })
    }

    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn')
    const pagecomplete = document.querySelector('.page-complete')

    if (confirmPaymentBtn) {
      confirmPaymentBtn.addEventListener('click', function () {
        checkout.classList.remove('checkout-slide-right')
        pagecomplete.classList.remove('hidden')

        setTimeout(function () {
          checkout.classList.add('checkout-slide-left')
          pagecomplete.classList.add('pagecomplete-slide-in')
        }, 0)

        setTimeout(function () {
          checkout.classList.add('checkout-slide-left-1')
          pagecomplete.classList.add('pagecomplete-slide-in-1')
        }, 250)

        progressBar.style.width = '105%'
        progressBar.setAttribute('aria-valuenow', '110')
      })
    }

    const productSummary = document.getElementById('product-summary')
    const productList = document.getElementById('product-list')

    if (productSummary) {
      productSummary.addEventListener('click', function () {
        if (productList.classList.contains('collapsed992')) {
          productList.classList.remove('collapsed992')
        } else {
          productList.classList.add('collapsed992')
        }
      })
    }
  })
}
