import Stripe from "stripe";
import Cart from "../interfaces/cartInterface";
import Order from "../interfaces/orderInterface";
import catchAsync from "../utils/asyncErrorHandler";
import Orders from "../models/orderModel";
import Product from "../models/productModel";
import User from "../models/userModel";





const orderAProduct = async (userCart: Cart) => {
  const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
    apiVersion: '2023-10-16'
  })
  try {

    const userCartProduct = await Product.find({ _id: userCart.product })
    const cartUser = await User.findOne(userCart.user)
    const lineItems = userCartProduct.map((product) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.title as string,
            description: product.description
          },
          customer: userCart.user,
          unit_amount: parseInt(product.price) * 100
        },
        quantity: 1,

      }
    });

    const customer = await stripe.customers.create({
      name: cartUser.username,
      address: {
        line1: '123 Main St',
        city: 'Some City',
        state: 'Some State',
        postal_code: '12345',
        country: 'IN' // Provide the country code for India
      }
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:9000/api/users/payment/success",
      cancel_url: "http://localhost:9000/api/users/payment/cancel",
      customer: customer.id
    })


    return session

  } catch (err) {
    console.log(err);
    throw new Error("Payment Failed")
  }


}


export {
  orderAProduct
}


