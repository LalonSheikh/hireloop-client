// import 'server-only'

// import Stripe from 'stripe'

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// export const PLAN_PRICE_ID = {
//     'seeker_pro':"price_1ULYb8DrTYLq3GDW2qaim7kY",
//     "seeker_premium":"price_1ULvFVDrTYLq3GDW8oRnMUlx",
//     "recruiter-growth":"price_1ULvG2DrTYLq3GDWNR0mkIwn",
//     "recruiter_enterprise":"price_1ULvGvDrTYLq3GDWazODIFoC"
// }
import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_free': "price_YOUR_SEEKER_FREE_ID_HERE", // যদি ফ্রি প্ল্যানের জন্য স্ট্রাইপ প্রোডাক্ট থাকে
    'seeker_pro': "price_1ULYb8DrTYLq3GDW2qaim7kY",
    'seeker_premium': "price_1ULvFVDrTYLq3GDW8oRnMUlx",
    'recruiter_free': "price_YOUR_RECRUITER_FREE_ID_HERE", // যদি ফ্রি প্ল্যানের জন্য স্ট্রাইপ প্রোডাক্ট থাকে
    'recruiter-growth': "price_1ULvG2DrTYLq3GDWNR0mkIwn",
    'recruiter_enterprise': "price_1ULvGvDrTYLq3GDWazODIFoC"
}