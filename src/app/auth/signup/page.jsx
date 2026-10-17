"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  TextField,
  Label,
  Input,
  InputGroup,
  Alert,
  CloseButton,
  Spinner,
  RadioGroup,
  Radio,
} from "@heroui/react";

import {
  Person,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  ArrowLeft,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, password }) {
  const errors = {};
  if (!name.trim()) errors.name = "Enter your name.";
  else if (name.trim().length < 2) errors.name = "Name is too short.";

  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  if (!password) errors.password = "Create a password.";
  else if (password.length < 8) errors.password = "Use at least 8 characters.";

  return errors;
}

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");
  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    const errors = validate({ name, email, password });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    const plan = role === "recruiter" ? "recruiter_free" : "seeker_free";

    await authClient.signUp.email(
      {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        plan,
        callbackURL: redirectTo,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          setSuccessMessage("Account created successfully. Redirecting...");
          setTimeout(() => {
            router.push(redirectTo);
          }, 800);
        },
        onError: (ctx) => {
          setLoading(false);
          setFormError(
            ctx.error?.message || "Something went wrong. Please try again.",
          );
        },
      },
    );
  }

  function updateField(setter, key) {
    return (value) => {
      setter(value);
      if (fieldErrors[key]) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    };
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0F17] px-4 py-12">
      {/* ambient backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(230,237,245,0.06) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#F5A623]/10 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <Link
          href={`/auth/signin?redirect=${redirectTo}`}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#7C8CA0] transition-colors hover:text-[#E6EDF5]"
        >
          <ArrowLeft width={16} height={16} />
          Back to sign in
        </Link>

        <div className="overflow-hidden rounded-2xl border border-[#1E2B3A] bg-[#121B27] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          {/* signature status readout */}
          <div className="flex items-center gap-2 border-b border-[#1E2B3A] bg-[#0F1620] px-6 py-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#34D399]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#7C8CA0]">
              Secure authentication
            </span>
          </div>

          <div className="px-6 pb-8 pt-7 sm:px-8">
            <h1 className="text-2xl font-semibold tracking-tight text-[#E6EDF5]">
              Create your account
            </h1>
            <p className="mt-1.5 text-sm text-[#7C8CA0]">
              Set up access in a few seconds.
            </p>

            {formError ? (
              <Alert status="danger" className="mt-6">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title className="font-mono text-xs uppercase tracking-wide">
                    Sign up failed
                  </Alert.Title>
                  <Alert.Description>{formError}</Alert.Description>
                </Alert.Content>
                <CloseButton onPress={() => setFormError("")} />
              </Alert>
            ) : null}

            {successMessage ? (
              <Alert status="success" className="mt-6">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title className="font-mono text-xs uppercase tracking-wide">
                    Account created
                  </Alert.Title>
                  <Alert.Description>{successMessage}</Alert.Description>
                </Alert.Content>
              </Alert>
            ) : null}

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-5"
              noValidate
            >
              <TextField
                name="name"
                isRequired
                isInvalid={!!fieldErrors.name}
                isDisabled={loading}
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-[#E6EDF5]">
                  Name
                </Label>
                <InputGroup className="rounded-lg border border-[#1E2B3A] bg-[#0A0F17] transition-colors focus-within:border-[#F5A623] data-[invalid=true]:border-[#F87171]">
                  <InputGroup.Prefix className="pl-3 text-[#7C8CA0]">
                    <Person width={16} height={16} />
                  </InputGroup.Prefix>
                  <Input
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) =>
                      updateField(setName, "name")(e.target.value)
                    }
                    className="bg-transparent px-2.5 py-2.5 text-sm text-[#E6EDF5] placeholder:text-[#4B5A67] outline-none"
                  />
                </InputGroup>
                {fieldErrors.name ? (
                  <p className="font-mono text-xs text-[#F87171]">
                    {fieldErrors.name}
                  </p>
                ) : null}
              </TextField>

              <TextField
                name="email"
                type="email"
                isRequired
                isInvalid={!!fieldErrors.email}
                isDisabled={loading}
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-[#E6EDF5]">
                  Email
                </Label>
                <InputGroup className="rounded-lg border border-[#1E2B3A] bg-[#0A0F17] transition-colors focus-within:border-[#F5A623] data-[invalid=true]:border-[#F87171]">
                  <InputGroup.Prefix className="pl-3 text-[#7C8CA0]">
                    <Envelope width={16} height={16} />
                  </InputGroup.Prefix>
                  <Input
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) =>
                      updateField(setEmail, "email")(e.target.value)
                    }
                    className="bg-transparent px-2.5 py-2.5 text-sm text-[#E6EDF5] placeholder:text-[#4B5A67] outline-none"
                  />
                </InputGroup>
                {fieldErrors.email ? (
                  <p className="font-mono text-xs text-[#F87171]">
                    {fieldErrors.email}
                  </p>
                ) : null}
              </TextField>

              <TextField
                name="password"
                isRequired
                isInvalid={!!fieldErrors.password}
                isDisabled={loading}
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-[#E6EDF5]">
                  Password
                </Label>
                <InputGroup className="rounded-lg border border-[#1E2B3A] bg-[#0A0F17] transition-colors focus-within:border-[#F5A623] data-[invalid=true]:border-[#F87171]">
                  <InputGroup.Prefix className="pl-3 text-[#7C8CA0]">
                    <Lock width={16} height={16} />
                  </InputGroup.Prefix>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) =>
                      updateField(setPassword, "password")(e.target.value)
                    }
                    className="bg-transparent px-2.5 py-2.5 text-sm text-[#E6EDF5] placeholder:text-[#4B5A67] outline-none"
                  />
                  <InputGroup.Suffix className="pr-3">
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="flex h-5 w-5 items-center justify-center text-[#7C8CA0] transition-colors hover:text-[#E6EDF5]"
                    >
                      {showPassword ? (
                        <EyeSlash width={16} height={16} />
                      ) : (
                        <Eye width={16} height={16} />
                      )}
                    </button>
                  </InputGroup.Suffix>
                </InputGroup>
                {fieldErrors.password ? (
                  <p className="font-mono text-xs text-[#F87171]">
                    {fieldErrors.password}
                  </p>
                ) : (
                  <p className="text-xs text-[#4B5A67]">
                    Minimum 8 characters.
                  </p>
                )}
              </TextField>

             {/* role selection */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-[#E6EDF5]">
                  Subscription plan
                </label>
                <div className="flex items-center gap-6">
                  {/* Job Seeker Option */}
                  <label 
                    onClick={() => setRole("seeker")}
                    className="flex cursor-pointer items-center gap-2.5"
                  >
                    <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${role === "seeker" ? "border-[#F5A623] bg-[#F5A623]/20" : "border-[#1E2B3A] bg-[#0A0F17]"}`}>
                      {role === "seeker" && <div className="h-2 w-2 rounded-full bg-[#F5A623]" />}
                    </div>
                    <span className="text-sm text-[#E6EDF5]">Job Seeker</span>
                  </label>

                  {/* Recruiter Option */}
                  <label 
                    onClick={() => setRole("recruiter")}
                    className="flex cursor-pointer items-center gap-2.5"
                  >
                    <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${role === "recruiter" ? "border-[#F5A623] bg-[#F5A623]/20" : "border-[#1E2B3A] bg-[#0A0F17]"}`}>
                      {role === "recruiter" && <div className="h-2 w-2 rounded-full bg-[#F5A623]" />}
                    </div>
                    <span className="text-sm text-[#E6EDF5]">Recruiter</span>
                  </label>
                </div>
              </div>
              <Button
                type="submit"
                variant="primary"
                isDisabled={loading}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-[#F5A623] py-2.5 text-sm font-semibold text-[#0A0F17] transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? <Spinner size="sm" /> : null}
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-[#7C8CA0]">
              Already have an account?{" "}
              <Link
                href={`/auth/signin?redirect=${redirectTo}`}
                className="font-medium text-[#F5A623] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
