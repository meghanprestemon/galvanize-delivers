let order = {
  burger: {price: 8.99,
          quantity: 0},
  pizza: {price: 11.99,
          quantity: 0},
  pig: {price: 14.99,
        quantity: 0},
  'ice-cream': {price: 7.99,
              quantity: 0},
  'total-items': 0
}

function addItemToOrder (event) {
  let itemId = $(event.target).parent().parent().attr('id');

  let orderTable = $('.table');
  let row = $('<tr>')
  let item = $(this).siblings('.order-item').text();
  let price = $(this).siblings('.price').text()

  let itemTd = $('<td>').html(item);
  let priceTd = $('<td>').text(price).css('text-align', 'right');

  $(row).append(itemTd[0]);
  $(row).append(priceTd[0]);

  $(orderTable).append(row[0]);

  let subtotal = Number(updateSubtotal(price));
  let tax = Number(updateTax(price));

  $('#total').text('$' + (subtotal + tax))

  updateOrderObject(itemId)
}

function priceToNumber(price) {
  return Number(price.replace(/[^0-9\.]+/g,""));
}

function updateSubtotal (price) {
  let priceNum = priceToNumber(price);
  let subtotal = $('#subtotal').text();
  let subtotalNum = Number(subtotal.replace(/[^0-9\.]+/g,""));

  $('#subtotal').text('$' + (priceNum + subtotalNum));
  return priceNum + subtotalNum;
}

function updateTax (price) {
  let priceNum = priceToNumber(price)
  let itemTax = priceNum * .085;
  let tax = $('#tax').text();
  let taxNum = Number(tax.replace(/[^0-9\.]+/g,""));

  $('#tax').text('$' + (itemTax + taxNum).toFixed(2));
  return (itemTax + taxNum).toFixed(2);
}

function updateOrderObject (itemId) {
  order[itemId].quantity += 1;
  order['total-items'] += 1;
}

function displayToast () {
  let errorCount = 0;

  if (!findOrderItems()) {
    errorCount += 1;
  }
  if (!hasName()) {
    errorCount += 1;
  }
  if (!hasPhoneNumber()) {
    errorCount += 1;
  }
  if (!hasAddress()) {
    errorCount += 1;
  }

  if (errorCount === 0) {
    $('#order-success').show();
  }

}

function findOrderItems () {
  if (order['total-items'] === 0) {
    let errorMsg = $('<p>').html('<strong>Error</strong> No items added to order.')
    $('#error').append(errorMsg);
    $('#order-error').show();
    return false;
  }
  return true;
}

function hasName () {
  if ($('#name').val().length === 0) {
    let errorMsg = $('<p>').html('<strong>Error</strong> No name provided.')
    $('#error').append(errorMsg);
    $('#order-error').show();
    return false
  }
  return true;
}

function hasPhoneNumber () {
  if ($('#phone').val().match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) === null) {
    let errorMsg = $('<p>').html('<strong>Error</strong> Not a valid phone number.')
    $('#error').append(errorMsg);
    $('#order-error').show();
    return false;
  }
  return true;
}

function hasAddress () {
  if ($('#address').val().length === 0) {
    let errorMsg = $('<p>').html('<strong>Error</strong> No address provided.')
    $('#error').append(errorMsg);
    $('#order-error').show();
    return false;
  }
  return true;
}

$(function(){

  $(".card-link").click(addItemToOrder);
  $("#order-button").click(displayToast);

});
