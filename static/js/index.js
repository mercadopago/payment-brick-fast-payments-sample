const mercadoPagoPublicKey = document.getElementById("mercado-pago-public-key").value;
const payerEmail = document.getElementById("payer-email").value;

const mercadopago = new MercadoPago(mercadoPagoPublicKey);
let paymentBrickController;
let fastPaymentToken;

async function loadPaymentForm() {
    // Make sure the product cost makes sense according to your country's currency
    // Too low or too high values might cause the mercadopago.authenticator method to throw an error
    const productCost = parseFloat(document.getElementById('amount').value).toFixed(2);

    // The user email must be from an existing Mercado Pago test user or a real Mercado Pago user
    // Otherwise, the mercadopago.authenticator will not find the user and will throw an error
    const userEmail = payerEmail;
    
    try {
        // Step 1: Initialize authenticator
        // mercadopago.authenticator will call an API to validate the productCost and userEmail
        const authenticator = await mercadopago.authenticator(productCost, userEmail);
        
        // Step 2: Generate fastPaymentToken
        // authenticator.show will show a popup to the user and then redirect to Mercado Pago or Mercado Libre mobile app.
        // once the user authenticates, this promise will resolve with the fastPaymentToken
        fastPaymentToken = await authenticator.show();
        
        // Step 3: Render Payment Brick
        // after we have the fastPaymentToken, we can render the payment brick
        await renderPaymentBrick();
        
    } catch (error) {
        // For a list of possible errors, see: https://www.mercadopago.com/developers/en/docs/checkout-api-v2/payment-integration/fast-payments#bookmark_erros_da_subclasse_authenticator

        alert("Error loading payment form, details in console");
        console.error(error);
    }
}

async function renderPaymentBrick() {
    const settings = {
        initialization: {
            fastPaymentToken: fastPaymentToken,
        },
        callbacks: {
            onReady: () => {
                console.log('brick ready')
            },
            onError: (error) => {
                alert(JSON.stringify(error))
            },
            onSubmit: (paymentData) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const result = await proccessPayment(paymentData)

                        // Resolving the promise will complete the brick payment button animation
                        resolve()

                        document.getElementById("payment-id").innerText = result.id;
                        document.getElementById("payment-status").innerText = result.status;
                        document.getElementById("payment-detail").innerText = result.detail;
                        $('.container__payment').fadeOut(500);
                        setTimeout(() => { $('.container__result').show(500).fadeIn(); }, 500);

                    } catch (error) {
                        alert(error.message);
                        
                        // Rejecting the promise will revert the brick payment button animation allowing the user to try again
                        reject()
                    }
                })
            }
        },
        locale: 'en',
        customization: {
            visual: {
                style: {
                    theme: 'dark',
                    customVariables: {
                        formBackgroundColor: '#1d2431'
                    }
                }
            }
        },
    }

    const bricks = mercadopago.bricks();
    paymentBrickController = await bricks.create('payment', 'mercadopago-bricks-container', settings);
}

const proccessPayment = async (bricksFormData) => {
    const response = await fetch("/process_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            formData: bricksFormData,
            userEmail: payerEmail
        }),
    })
    const result = await response.json();

    if (result.hasOwnProperty("error_message")) {
        throw new Error(result.error_message);
    }

    return result;
}

// Handle transitions
document.getElementById('checkout-btn').addEventListener('click', function(){
    $('.container__cart').fadeOut(500);
    setTimeout(() => {
        $('.container__payment').show(500).fadeIn();
    }, 500);
});

// Handle Mercado Pago payment button click
document.getElementById('mp-payment-btn').addEventListener('click', async function(){
    const button = this;
    button.disabled = true;
    button.innerText = 'Loading...';
    
    try {
        await loadPaymentForm();
        document.getElementById('payment-button-container').style.display = 'none';
    } catch (error) {
        button.disabled = false;
        button.innerText = 'Pay with Mercado Pago';
        console.error('Error loading payment form:', error);
    }
});

document.getElementById('go-back').addEventListener('click', function(){
    $('.container__payment').fadeOut(500);
    
    // Reset payment form state
    document.getElementById('payment-button-container').style.display = 'block';
    
    const button = document.getElementById('mp-payment-btn');
    button.disabled = false;
    button.innerText = 'Pay with Mercado Pago';
    
    // Destroy existing payment brick if exists
    if (paymentBrickController) {
        paymentBrickController.unmount();
        paymentBrickController = null;
    }
    
    setTimeout(() => { $('.container__cart').show(500).fadeIn(); }, 500);
});

// Handle price update
function updatePrice(){
    let quantity = document.getElementById('quantity').value;
    let unitPrice = document.getElementById('unit-price').innerText;
    let amount = parseInt(unitPrice) * parseInt(quantity);

    document.getElementById('cart-total').innerText = '$ ' + amount;
    document.getElementById('summary-price').innerText = '$ ' + unitPrice;
    document.getElementById('summary-quantity').innerText = quantity;
    document.getElementById('summary-total').innerText = '$ ' + amount;
    document.getElementById('amount').value = amount;
};



document.getElementById('quantity').addEventListener('change', updatePrice);
updatePrice();