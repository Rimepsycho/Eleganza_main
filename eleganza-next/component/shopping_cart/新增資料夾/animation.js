if (typeof document !== 'undefined') {
   const checkbox = document.getElementById("same-as-shipping");
   const billingAddress = document.getElementById("billing-address");
 
   if (checkbox) {
     checkbox.addEventListener("change", function () {
       // Your code here
     });
   }
 }
   
   const checkbox = document.getElementById("same-as-shipping");
   const billingAddress = document.getElementById("billing-address");

   checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
         billingAddress.classList.add('collapsed');
      } else {
         billingAddress.classList.remove('collapsed');
      }
   });
   // 获取 DOM 元素
   const select = document.getElementById("shipping-method");
   const details = document.getElementById("home-delivery-details");

   // 事件监听器，当下拉框值发生变化时触发
   select.addEventListener("change", function () {
      if (select.value === "home_delivery") {
         // 展开手风琴
         details.classList.remove('collapsed');
      } else {
         // 折叠手风琴
         details.classList.add('collapsed');
      }
   });



   const paymentMethod = document.getElementById("payment-method");
   const creditCardDetails = document.getElementById("credit-card-details");

   // 为支付方式添加 change 事件监听器
   paymentMethod.addEventListener("change", function () {
      if (paymentMethod.value === "credit_card") {
         // 展开信用卡详细信息
         creditCardDetails.classList.remove('collapsed');
      } else {
         // 折叠信用卡详细信息
         creditCardDetails.classList.add('collapsed');
      }
   });



document.addEventListener("DOMContentLoaded", function () {
      // 获取需要操作的元素
      const animateButton = document.getElementById('animateBtn');
      const pagecart = document.querySelector('.page-cart');
      const justifycontentbetween = document.querySelector('#justify-content-between');
      const checkout = document.querySelector('.check-out');
      const footerContainer = document.querySelector('.footer-container');
      const dflex = document.querySelector('#d-flex');
      const progressBar = document.querySelector('.progress-bar');

      // 为按钮添加点击事件监听器
      animateButton.addEventListener('click', function () {
         // 移除隐藏状态
         checkout.classList.remove('hidden');
         footerContainer.classList.remove('fcpt');

         // 在0毫秒后执行动画相关的类添加
         setTimeout(function () {
            pagecart.classList.add('checkout-slide-left');
            checkout.classList.add('checkout-slide-right');
            dflex.classList.add('checkout-slide-up');
            justifycontentbetween.classList.add('checkout-slide-left-down');
         }, 0);

         // 在250毫秒后执行另一组类添加
         setTimeout(function () {
            checkout.classList.add('checkout-position');
            pagecart.classList.add('pagecart-dpn');
         }, 250);

         // 更新进度条
         progressBar.style.width = '55%';
         progressBar.setAttribute('aria-valuenow', '55');
      });
   });


   // 在页面加载完成后，添加事件监听器
document.addEventListener('DOMContentLoaded', function () {
      const confirmPaymentBtn = document.getElementById('confirmPaymentBtn'); // 按钮，用于触发支付确认
      const checkout = document.querySelector('.check-out'); // 结账部分
      const pagecomplete = document.querySelector('.page-complete'); // 完成页面
      const progressBar = document.querySelector('.progress-bar'); // 进度条

      // 为按钮添加点击事件监听器
      confirmPaymentBtn.addEventListener('click', function () {
         // 清除原有动画
         checkout.classList.remove('checkout-slide-right');
         pagecomplete.classList.remove('hidden'); // 显示完成页面

         // 设置动画效果
         setTimeout(function () {
            checkout.classList.add('checkout-slide-left'); // 移动结账页面
            pagecomplete.classList.add('pagecomplete-slide-in'); // 移动完成页面
         }, 0);

         // 延迟 250 毫秒，继续动画
         setTimeout(function () {
            pagecomplete.classList.add('pagecomplete-slide-in-1');
            checkout.classList.add('checkout-slide-left-1'); // 进一步移动
         }, 250);

         // 更新进度条
         progressBar.style.width = '105%'; // 设置进度条宽度
         progressBar.setAttribute('aria-valuenow', '110'); // 设置 ARIA 值，确保辅助功能
      });
   });


document.addEventListener("DOMContentLoaded", function() {
    const productSummary = document.getElementById("product-summary");
    const productList = document.getElementById("product-list");

    productSummary.addEventListener("click", function() {
        // 检查当前是否已经展开
        if (productList.classList.contains('collapsed992')) {
            // 如果已收缩，则展开
            productList.classList.remove('collapsed992'); // 展开手风琴
        } else {
            // 如果已展开，则收缩
            productList.classList.add('collapsed992'); // 收缩手风琴
        }
    });
});
