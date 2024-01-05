import Stripe from "stripe";
import Cart from "../interfaces/cartInterface";
import Orders from "../models/orderModel";
import Product from "../models/productModel";
import User from "../models/userModel";



const orderAProduct = async (userCart: Cart) => {
  const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
    apiVersion: '2023-10-16'
  })
  try {
    const userCartProduct = await Product.find({ _id: userCart.product })
    if (userCartProduct.length === 0) {
      throw new Error("Cart Not Found")
    }
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



    if (session) {
      const order = new Orders({
        user: userCart.user,
        products: userCartProduct,
        orderId: session.id,
        totalPrice: userCart.totalPrice,
        totalItems: userCart.product.length,
        orderStatus: session.payment_status
      })
      await order.save()
      return session
    }

  } catch (err) {
    throw new Error(err)
  }


}


export {
  orderAProduct
}


