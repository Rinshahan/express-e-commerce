import Stripe from "stripe";
import Cart from "../interfaces/cartInterface";
import Order from "../interfaces/orderInterface";
import catchAsync from "../utils/asyncErrorHandler";
import Orders from "../models/orderModel";

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
  apiVersion: '2023-10-16'
})
function generateOrderId(): string {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 7); // 5 random characters
  return `ORD-${timestamp}-${randomPart}`;
}


const orderAProduct = async (userCart: Cart): Promise<Order> => {
  //console.log();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: userCart.totalPrice * 100, // Convert to cents
    currency: "INR",

  });

  const paymentMethodToken = "tok_visa"

  const confirmedPayment = await stripe.paymentIntents.confirm(paymentIntent.id, { payment_method: paymentMethodToken })
  if (confirmedPayment.status === "succeeded") {
    const order = new Orders({
      user: userCart.user,
      products: userCart.product,
      purchaseDate: Date.now(),
      orderId: generateOrderId(),
      totalPrice: userCart.totalPrice,
      totalItems: userCart.product.length,
      paymentMethod: confirmedPayment.payment_method
    })
    await order.save()

    // 5. Update Inventory (if applicable)
    // ... Code to reduce product quantities based on cart items

    return order
  } else {
    throw new Error("Payment Failed")
  }

}


export {
  orderAProduct
}


