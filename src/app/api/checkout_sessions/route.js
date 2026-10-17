import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PLAN_PRICE_ID, stripe } from "../../../lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await request.formData();
    const planId = formData.get("plan_id");
    const priceId = PLAN_PRICE_ID[planId];

    console.log("Received priceId in backend:", priceId); // Debug log

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is missing" },
        { status: 400 },
      );
    }
    const user = await getUserSession();
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata:{planId},
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`, // Updated path here
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("STRIPE ERROR DETAILS:", err.message); // Prints exact Stripe error in terminal
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
