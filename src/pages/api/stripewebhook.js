import { PlacePrintifyProduct } from "@/http";

const stripe = require("stripe")(process.env.STRIPE_KEY);
const { buffer } = require("micro");

const endpointSecret = process.env.STRIPE_WH_SESSION;
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const sig = req.headers["stripe-signature"];
      const body = await buffer(req);

      if (endpointSecret) {
        try {
          let event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
          console.log("webhook verified! ", event.type);
          if (event.type === "checkout.session.completed") {
            const bufferData = Buffer.from(body);
            const jsonData = JSON.parse(bufferData.toString("utf8"));
            const data = jsonData?.data?.object;
            try {
              const paymentPayload = await stripe.customers.retrieve(
                data.customer
              );

              if (paymentPayload) {
                const payloadJson = JSON.parse(
                  paymentPayload?.metadata?.payload
                );

                // data extracted from paid payment
                const {
                  variant_id,
                  quantity,
                  product_id,
                  chargedPrice, // chargedPrice/100=>will give actual price
                  varient,
                } = payloadJson;
                // product payload
                const productPayload = {
                  external_id: Math.floor(Math.random() * 100000000).toString(), // replace with actual DB product
                  line_items: [
                    {
                      product_id: product_id,
                      variant_id: variant_id,
                      quantity: quantity,
                    },
                  ],
                  shipping_method: 1,
                  is_printify_express: false,
                  send_shipping_notification: false,
                  address_to: {
                    first_name: "John",
                    last_name: "Smith",
                    email: "example@msn.com",
                    phone: "0574 69 21 90",
                    country: "BE",
                    region: "",
                    address1: "ExampleBaan 121",
                    address2: "45",
                    city: "Retie",
                    zip: "2470",
                  },
                };
                const response = await PlacePrintifyProduct(productPayload);
                if (response.status === 200) {
                  return res
                    .status(200)
                    .json({ success: true, data: response?.data });
                }
              }
            } catch (err) {
              console.log(err);
              return res.status(400).json({ message: err });
            }
          }
        } catch (err) {
          console.log("webhook error! ", err.message);
          return res.status(400).json({ message: err });
        }
      }
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}
