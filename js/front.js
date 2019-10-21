$('.adpAddToCart').click(function(e){
    e.preventDefault();
    AddToCart($(this));
    if (!($(this).siblings().eq(1).length > 0)){
    $(this).after('<a href="'+siteUrl('cart')+'" class="added_to_cart wc-forward" title="View cart">View cart</a>');
    }
});
$('.addToCartForm').on('submit',function(e){
    e.preventDefault();
    console.log($(this));
    // AddToCart($(this));
    
    $.post($(this).attr('action'), { pd_id: $(this).find('input[name=pd_id]').val(), pd_quantity: $(this).find('input[name=pd_quantity]').val() }, function (data) {
        retriveCart(data);
       init_cartRemove()
    });
});

function AddToCart(elem){
    $.post(elem.attr('href') + '/' + elem.attr('data-pd-id'), { pd_id: elem.attr('data-pd-id'), pd_quantity: elem.attr('data-quantity') }, function (data) {
        retriveCart(data);
       init_cartRemove()
    });
}
function DeleteFromCart(elem,checkout=false){
    $.post(elem.attr('href'), { pd_id: elem.attr('data-pd-id'),'removeCart':true}, function (data) {
        retriveCart(data);
       init_cartRemove()
        if(checkout){
            checkOut(data);
        }
        
    });
}
function getCart(){
    $.post(siteUrl('getCart'), { getCart: true }, function (data) {
        retriveCart(data);
       init_cartRemove()
    });
}
function retriveCart(data){
        console.log(JSON.stringify(data, 0, null));
        let cart_data = JSON.parse(data);
        let cart_pd = JSON.parse(cart_data.details);
        let cart = JSON.parse(cart_data.item);
        let fl_mini_cart_content = `<ul class="cart-sidebar-body woocommerce-mini-cart cart_list product_list_widget ">`;
        for (i in cart_pd) {
            fl_mini_cart_content += `<li class="cart-list-product woocommerce-mini-cart-item mini_cart_item">
      <a href="${siteUrl('cart/remove-item/' + cart_pd[i].pd_id)}" class="float-right remove-cart removeFromCart" aria-label="Remove this item" data-product_id="${cart_pd[i].pd_id}" data-cart_item_key="03afdbd66e7929b125f8597834fa83a4" data-product_sku="9S3M4N"><i class="mdi mdi-close"></i></a>													<a href="${siteUrl('product/'+cart_pd[i].pd_slug)}">
      <img width="80" height="80" src="${siteUrl(cart_pd[i].pd_thumb)}" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="">							</a>
      <span class="badge badge-success">${cart_pd[i].pd_discount} % OFF</span>
      <h5><a href="${siteUrl('product/' + cart_pd[i].pd_slug)}">${cart_pd[i].pd_name}</a></h5>
      <p class="offer-price mb-0"><span class="quantity">${cart_pd[i].pd_quantity} × <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">£</span>${cart_pd[i].pd_price}</span></span></p>
   </li>`
        }

        fl_mini_cart_content += `</ul><div class="cart-sidebar-footer">
   <div class="cart-store-details">
      <p class="woocommerce-mini-cart__total total">Subtotal <strong class="float-right"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">£</span>${cart.cart_total}</span></strong></p>
   </div>
   <p class="woocommerce-mini-cart__buttons buttons"><a href="${siteUrl('cart')}" class="button wc-forward">View cart</a><a href="http://klbtheme.com/groci/checkout/" class="button checkout wc-forward">Checkout</a></p>
</div>`;
        $('.fl-mini-cart-content').html(fl_mini_cart_content);
        $('.noPd').text(cart.no_of_pd);
}

getCart();

function cart(){
$.post(siteUrl('getCart'), { getCart: true }, function (data) {
    checkOut(data);
})
}
function init_cartRemove(){
   $('.removeFromCart').click(function (e) {
      e.preventDefault();
      DeleteFromCart($(this));
      // cart();
      // if (!($(this).siblings().eq(1).length > 0)) {
      //     $(this).after('<a href="http://klbtheme.com/groci/cart/" class="added_to_cart wc-forward" title="View cart">View cart</a>');
      // }
   });
}
cart();
function checkOut(data){
    let cart_data = JSON.parse(data);
    let cart_pd = JSON.parse(cart_data.details);
    let cart = JSON.parse(cart_data.item);
    let carts = `<div class="card card-body cart-table">
   <div class="table-responsive">
      <form class="woocommerce-cart-form" action="http://klbtheme.com/groci/cart/" method="post">
         <table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents table cart_summary" cellspacing="0">
            <thead>
               <tr>
                  <th class="product-thumbnail">&nbsp;</th>
                  <th class="product-name">Product</th>
                  <th class="product-price">Price</th>
                  <th class="product-quantity">Quantity</th>
                  <th class="product-subtotal">Total</th>
                  <th class="product-remove"><i class="mdi mdi-delete-forever"></i></th>
               </tr>
            </thead>
            <tbody>`;
        for(i in cart_pd){
          carts +=  `<tr class="woocommerce-cart-form__cart-item cart_item">
                  <td class="product-thumbnail cart_product">
                     <a href="http://klbtheme.com/groci/product/organic-broccoli/"><img width="80" height="80" src="${siteUrl(cart_pd[i].pd_thumb)}" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt=""></a>						
                  </td>
                  <td class="product-name" data-title="Product">
                     <a href="${siteUrl('product/'+cart_pd[i].pd_slug)}">${cart_pd[i].pd_name}</a>						
                  </td>
                  <td class="product-price" data-title="Price">
                     <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">£</span>${cart_pd[i].pd_price}</span>						
                  </td>
                  <td class="product-quantity" data-title="Quantity">
                     <div class="quantity">
                        <p>${cart_pd[i].pd_quantity}</p>
                     </div>
                  </td>
                  <td class="product-subtotal" data-title="Total">
                     <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">£</span>${parseInt(cart_pd[i].pd_quantity)*parseInt(cart_pd[i].pd_price)}</span>						
                  </td>
                  <td class="product-remove">
                     <a href="${siteUrl('cart/remove-item/'+cart_pd[i].pd_id)}" class="btn btn-sm btn-danger removeFromCart2" aria-label="Remove this item" data-pd-id="${cart_pd[i].pd_id}" data-product_sku="9S3M4N"><i class="mdi mdi-close-circle-outline"></i></a>						
                  </td>
               </tr>`;
        }
          carts +=  `</tbody>
         </table>
      </form>
      <div class="cart-collaterals">
         <div class="cart_totals">
            <h2>Cart totals</h2>
            <table cellspacing="0" class="shop_table shop_table_responsive">
               <tbody>
                  <tr class="cart-subtotal">
                     <th>Subtotal</th>
                     <td data-title="Subtotal"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">£</span>${cart.cart_total}</span></td>
                  </tr>
                  <tr class="order-total">
                     <th>Total</th>
                     <td data-title="Total"><strong><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">£</span>${cart.cart_total}</span></strong> </td>
                  </tr>
               </tbody>
            </table>
            <div class="wc-proceed-to-checkout">
               <a href="http://klbtheme.com/groci/checkout/" class="btn btn-secondary checkout-button button alt wc-forward">
               Proceed to checkout</a>
            </div>
         </div>
      </div>
   </div>
</div>`;
$('#cart').html(carts);
 $('.removeFromCart2').click(function (e) {
        e.preventDefault();
        DeleteFromCart($(this),true);
        // cart();
        // if (!($(this).siblings().eq(1).length > 0)) {
        //     $(this).after('<a href="http://klbtheme.com/groci/cart/" class="added_to_cart wc-forward" title="View cart">View cart</a>');
        // }
    });
}