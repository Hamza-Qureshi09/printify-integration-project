const stripe = require("stripe")(process.env.STRIPE_KEY);

export default async function POST(req, res) {
  try {
    if (req.method === "POST") {
      const payload = req.body;
      if (Object.keys(payload).length < 1) {
        return res.status(400).json({ message: "Invalid Payload!" });
      }

      const sessionPayload = {
        name: payload?.title,
        price: Math.floor(payload?.varient?.price * 100), // Convert to cents, Stripe expects integers.
        currency: "usd",
        description: `Service Charges! You are being charged for the Product ${payload?.title}.`,
      };

      try {
        // stripe customer
        const customer = await stripe.customers.create({
          email: "testing123@gmail.com", // actual user email
          metadata: {
            userId: "24845155695724607867", // actual user id
            payload: JSON.stringify({
              chargedPrice: Math.floor(sessionPayload?.price),
              product_id: payload?.productId || "",
              quantity: payload?.varient?.quantity || 1,
              variant_id: payload?.varient?.id || "",
              varient: payload?.varient,
            }),
          },
        });
        // stripe session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          customer: customer.id,
          line_items: [
            {
              price_data: {
                currency: sessionPayload.currency,
                unit_amount: sessionPayload.price,
                product_data: {
                  name: sessionPayload.name,
                  description: sessionPayload.description,
                },
              },
              quantity: payload?.varient?.quantity || 1,
            },
          ],
          shipping_address_collection: {
            allowed_countries: ["US", "PK", "CA", "BE"],
          },
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_APPLICATION_BASE_URL}/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_APPLICATION_BASE_URL}/cancel`,
        });
        if (session) {
          return res.status(200).json({ id: session.id });
        }
      } catch (error) {
        return res.status(400).json({ message: error?.message });
      }
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}
