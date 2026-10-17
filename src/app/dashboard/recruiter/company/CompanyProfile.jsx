"use client";

import React, { useState, useEffect } from "react";
import { Form, toast } from "@heroui/react";
import { createCompany } from "@/lib/actions/companies";
import { useSession } from "@/lib/auth-client"; // Import your actual auth hook

const IMGBB_API_KEY =
  process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API || "YOUR_IMGBB_API_KEY";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  // Use real session from Better Auth
  const { data: session } = useSession();

  const [company, setCompany] = useState(recruiterCompany);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [formData, setFormData] = useState({
    name: company?.name || "",
    industry: company?.industry || "Technology",
    websiteUrl: company?.websiteUrl || "",
    location: company?.location || "",
    employeeCount: company?.employeeCount || "1-10 employees",
    logoUrl: company?.logoUrl || "",
    description: company?.description || "",
    status: company && company.status ? company.status : "Pending",
    recruiterId: recruiter?.id || "",
  });

  useEffect(() => {
    async function fetchCompany() {
      // Use session?.user?.id or session?.id depending on your auth client structure
      const currentUserId = session?.user?.id || session?.id;
      if (!currentUserId) return;

      try {
        const res = await fetch(`/api/company?userId=${currentUserId}`);
        const data = await res.json();
        if (data.company) {
          setCompany(data.company);
          setFormData(data.company);
        }
      } catch (err) {
        console.error("Failed to load company", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCompany();
  }, [session]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setUploadingLogo(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: data,
        },
      );
      const result = await response.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, logoUrl: result.data.url }));
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentUserId = session?.user?.id || session?.id;

    try {
      const companyData = {
        ...formData,
        userId: currentUserId, // Uses the real session ID
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      console.log("Submitted company data:", companyData);

      const payload = await createCompany(companyData);

      console.log("Company created:", payload);

      if (payload.success) {
        const savedCompany = { ...companyData, _id: payload.insertedId };
        setCompany(savedCompany);

        toast.success("Company Profile Created Successfully");
        setIsRegistering(false);
        setIsEditing(false);
      } else {
        alert(payload.message || "Failed to create company");
      }
    } catch (error) {
      console.error("Company creation error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-neutral-400 text-sm">
        Loading company profile...
      </div>
    );
  }

  // --- STATE 1: NO COMPANY REGISTERED ---
  if (!company?._id && !isRegistering) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8 w-full max-w-[320px] aspect-square bg-[#18181b] border border-neutral-800/80 rounded-3xl shadow-2xl flex items-center justify-center">
          <div className="absolute -top-3 right-8 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-neutral-950">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
              <line x1="12" y1="6" x2="12" y2="10"></line>
              <line x1="10" y1="8" x2="14" y2="8"></line>
            </svg>
          </div>

          <div className="w-4/5 h-4/5 border border-neutral-800/60 rounded-2xl p-4 flex flex-col gap-3 bg-[#121214]/60">
            <div className="w-10 h-10 rounded-lg bg-neutral-800/80"></div>
            <div className="w-3/4 h-3 bg-neutral-800/80 rounded-md"></div>
            <div className="w-full h-2 bg-neutral-800/40 rounded-md mt-2"></div>
            <div className="w-5/6 h-2 bg-neutral-800/40 rounded-md"></div>
            <div className="w-2/3 h-2 bg-neutral-800/40 rounded-md"></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
          Company not registered yet
        </h2>
        <p className="text-sm text-neutral-400 max-w-md mb-8 leading-relaxed">
          Set up your business profile to start posting high-performance job
          listings and manage your talent loop.
        </p>

        <div className="flex items-center gap-4 w-full max-w-md justify-center">
          <button
            onClick={() => setIsRegistering(true)}
            className="flex-1 py-3 px-5 rounded-xl bg-white text-neutral-950 text-sm font-semibold hover:bg-neutral-200 transition-colors shadow-lg"
          >
            Register your company
          </button>
          <button
            onClick={() => alert("Redirecting to FAQ...")}
            className="flex-1 py-3 px-5 rounded-xl bg-[#18181b] border border-neutral-800 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            View FAQ
          </button>
        </div>

        <p className="text-xs text-neutral-500 mt-12">
          Need specialized assistance? Contact our enterprise support team.
        </p>
      </div>
    );
  }

  // --- STATE 2 & 3: REGISTERED VIEW OR FORM VIEW ---
  const showForm = !company || isEditing || isRegistering;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {!showForm ? (
        <div className="bg-[#18181b] border border-neutral-800/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="px-6 py-6 md:px-8 md:pt-8 border-b border-neutral-800/80 flex items-start justify-between">
            <div className="flex items-center gap-4">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="w-16 h-16 rounded-xl object-cover border border-neutral-800"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400">
                  🏢
                </div>
              )}
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {company.name}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                      company.status === "Approved"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : company.status === "Rejected"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {company.status}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-neutral-400 mt-1">
                  {company.industry} • {company.employeeCount}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors"
            >
              Edit Company
            </button>
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-6 text-sm text-neutral-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-neutral-500 font-medium">
                  Website URL
                </span>
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:underline"
                >
                  {company.websiteUrl}
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-neutral-500 font-medium">
                  Location
                </span>
                <span className="text-white">{company.location}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-neutral-500 font-medium">
                Brief Description
              </span>
              <p className="text-neutral-300 leading-relaxed bg-[#121214] border border-neutral-800/60 p-4 rounded-xl">
                {company.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Form
          onSubmit={handleSubmit}
          className="bg-[#18181b] border border-neutral-800/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="px-6 py-6 md:px-8 md:pt-8 border-b border-neutral-800/80 flex items-start justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {company ? "Edit Company Details" : "Register New Company"}
              </h1>
              <p className="text-xs md:text-sm text-neutral-400 mt-1">
                Enter your business details to start hiring on HireLoop.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsRegistering(false);
                setIsEditing(false);
              }}
              className="text-neutral-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-neutral-800"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-300">
                  Company Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Acme Corp"
                  required
                  className="w-full bg-[#121214] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-300">
                  Industry / Category
                </label>
                <div className="relative">
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className="w-full bg-[#121214] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-300">
                  Website URL
                </label>
                <div className="flex items-center w-full bg-[#121214] border border-neutral-800 rounded-xl overflow-hidden focus-within:border-neutral-600 transition-colors">
                  <span className="bg-neutral-800/40 text-neutral-400 text-xs px-3.5 py-3 border-r border-neutral-800 select-none">
                    https://
                  </span>
                  <input
                    name="websiteUrl"
                    type="text"
                    value={formData.websiteUrl.replace(/^https?:\/\//, "")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        websiteUrl:
                          "https://" +
                          e.target.value.replace(/^https?:\/\//, ""),
                      })
                    }
                    placeholder="www.company.com"
                    required
                    className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-300">
                  Location
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                    📍
                  </span>
                  <input
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="City, Country"
                    required
                    className="w-full bg-[#121214] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-300">
                  Employee Count Range
                </label>
                <div className="relative">
                  <select
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        employeeCount: e.target.value,
                      })
                    }
                    className="w-full bg-[#121214] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="1-10 employees">1-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="201-500 employees">201-500 employees</option>
                    <option value="500+ employees">500+ employees</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                    ▼
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-neutral-300">
                  Company Logo
                </label>
                <label className="flex items-center gap-3 border border-neutral-800 bg-[#121214] hover:bg-neutral-800/40 rounded-xl px-4 py-2.5 cursor-pointer transition-colors">
                  {formData.logoUrl ? (
                    <img
                      src={formData.logoUrl}
                      alt="Logo preview"
                      className="w-9 h-9 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400">
                      ⬆️
                    </div>
                  )}
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs text-white font-medium truncate">
                      {uploadingLogo
                        ? "Uploading..."
                        : formData.logoUrl
                          ? "Change Logo"
                          : "Upload image"}
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      PNG, JPG up to 5MB
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-neutral-300">
                Brief Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Tell us about your company's mission and culture..."
                required
                className="w-full bg-[#121214] border border-neutral-800 rounded-xl p-3.5 text-sm text-white placeholder:text-neutral-500 min-h-[110px] focus:outline-none focus:border-neutral-600 transition-colors"
              />
            </div>
          </div>

          <div className="px-6 py-4 md:px-8 md:py-5 bg-[#121214]/60 border-t border-neutral-800/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(false);
                setIsEditing(false);
              }}
              className="px-5 py-2.5 rounded-xl border border-neutral-800 text-sm font-medium text-neutral-300 hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || uploadingLogo}
              className="px-6 py-2.5 rounded-xl bg-white text-neutral-950 text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50 shadow-lg"
            >
              {isSubmitting
                ? "Saving..."
                : company
                  ? "Update Company"
                  : "Register Company"}
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}
