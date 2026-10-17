"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Check,
  ChevronDown,
  Briefcase,
  UserCheck,
} from "lucide-react";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("seekers");
  const [openFaq, setOpenFaq] = useState(null);

  const seekerPlans = [
    {
      name: "Free",
      id: "seeker_free",
      price: "$0",
      period: "/forever",
      description: "Essential tools to start browsing and applying for your next role.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile customization",
        "Email job alerts",
      ],
      popular: false,
      cta: "Get Started Free",
      isPaid: false,
      href: "/signup",
    },
    {
      name: "Pro",
      price: "$19",
      id: "seeker_pro",
      period: "/month",
      description: "Designed for active job seekers looking for advanced insights.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Full application tracking dashboard",
        "Access to salary insights & benchmarks",
      ],
      popular: true,
      cta: "Upgrade to Pro",
      isPaid: true,
    },
    {
      name: "Premium",
      price: "$39",
      id: "seeker_premium",
      period: "/month",
      description: "Maximum visibility and priority access to top-tier opportunities.",
      features: [
        "Everything in Pro included",
        "Unlimited monthly applications",
        "Profile boost to top recruiters",
        "Early access to newly posted jobs",
        "24/7 Priority support",
      ],
      popular: false,
      cta: "Go Premium",
      isPaid: true,
    },
  ];

  const recruiterPlans = [
    {
      name: "Free",
      id: "recruiter_free",
      price: "$0",
      period: "/forever",
      description: "Great for early-stage startups and first-year hiring needs.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
        "Community forum support",
      ],
      popular: false,
      cta: "Start Hiring Free",
      isPaid: false,
      href: "/signup",
    },
    {
      name: "Growth",
      id: "recruiter-growth",
      price: "$49",
      period: "/month",
      description: "For scaling teams looking to streamline recruitment workflows.",
      features: [
        "Up to 10 active job posts",
        "Advanced applicant tracking system (ATS)",
        "Basic recruitment analytics",
        "Dedicated email support",
      ],
      popular: true,
      cta: "Choose Growth",
      isPaid: true,
    },
    {
      name: "Enterprise",
      id: "recruiter_enterprise",
      price: "$149",
      period: "/month",
      description: "Comprehensive enterprise hiring suite with custom branding.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics & reporting dashboard",
        "Featured job listings placement",
        "Team collaboration seats",
        "Custom company branding",
        "Dedicated account manager & priority support",
      ],
      popular: false,
      cta: "Contact Enterprise",
      isPaid: true,
    },
  ];

  const faqs = [
    {
      question: "Can I cancel or change my subscription at any time?",
      answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time directly from your account settings. Changes take effect at the start of your next billing cycle.",
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a 14-day money-back guarantee on all paid plans. If you are not completely satisfied with your experience, contact our support team within 14 days of purchase for a full refund.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), as well as secure regional payment methods processed via Stripe.",
    },
    {
      question: "How does plan switching work?",
      answer: "When you switch to a higher tier plan, the upgrade is instantaneous and prorated for the remainder of your billing period. Downgrading applies your new plan limits starting from your next billing cycle.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const currentPlans = activeTab === "seekers" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-950/40 border border-pink-900/50 text-pink-400 text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Transparent Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Simple plans for your career & hiring goals
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg">
            Choose the perfect plan tailored for ambitious job seekers or growing recruitment teams.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center mt-8">
            <div className="bg-[#121212] border border-neutral-800 p-1.5 rounded-2xl flex items-center shadow-lg">
              <button
                onClick={() => setActiveTab("seekers")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  activeTab === "seekers"
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <UserCheck className="w-4 h-4" /> For Job Seekers
              </button>
              <button
                onClick={() => setActiveTab("recruiters")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  activeTab === "recruiters"
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-4 h-4" /> For Recruiters
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {currentPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-[#121212] border rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl transition-all hover:border-neutral-700 ${
                plan.popular
                  ? "border-pink-600/80 ring-1 ring-pink-600/50"
                  : "border-neutral-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-neutral-400 text-sm mb-6 min-h-[40px]">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-neutral-400 text-sm">{plan.period}</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-neutral-800 mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Key Features
                  </p>
                  {plan.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-3 text-sm text-neutral-300"
                    >
                      <div className="p-1 bg-pink-950/60 border border-pink-900/50 rounded-full text-pink-400 mt-0.5 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {plan.isPaid ? (
                <form action="/api/checkout_sessions" method="POST">
                  <input type="hidden" name="plan_id" value={plan.id} />
                  <button
                    type="submit"
                    role="link"
                    className={`w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      plan.popular
                        ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-600/20"
                        : "bg-neutral-800 hover:bg-neutral-700 text-white"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </form>
              ) : (
                <a
                  href={plan.href || "/signup"}
                  className="w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all bg-neutral-800 hover:bg-neutral-700 text-white"
                >
                  {plan.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto bg-[#121212] border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-neutral-400 text-sm">
              Got questions about our pricing or plans? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-neutral-800 rounded-2xl overflow-hidden transition-colors bg-[#18181b]/50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between gap-4 hover:bg-neutral-800/40 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180 text-pink-400" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-1 text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}