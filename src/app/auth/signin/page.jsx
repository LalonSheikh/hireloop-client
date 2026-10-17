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
} from "@heroui/react";

import {
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  ArrowLeft,
  PersonPlus,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
// import { serialize } from "mongodb";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Enter your password.";
  }

  return errors;
}

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  console.log("redirecting To ", redirectTo)

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setFormError("");
    setSuccessMessage("");

    const errors = validate({
      email,
      password,
    });

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    await authClient.signIn.email(
      {
        email: email.trim(),
        password,
        callbackURL: redirectTo,
      },
      {
        onRequest: () => {
          setLoading(true);
        },

        onSuccess: () => {
          setLoading(false);

          setSuccessMessage(
            "Signed in successfully. Welcome",
          );

          setTimeout(() => {
            router.push(redirectTo);
          }, 800);
        },

        onError: (ctx) => {
          setLoading(false);

          setFormError(
            ctx.error?.message ||
              "Invalid email or password. Please try again.",
          );
        },
      },
    );

    setLoading(false);
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

      if (formError) {
        setFormError("");
      }

      if (successMessage) {
        setSuccessMessage("");
      }
    };
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0F17] px-4 py-12">
      {/* Ambient backdrop */}
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

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#F5A623]/10 blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Back to home */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#7C8CA0] transition-colors hover:text-[#E6EDF5]"
        >
          <ArrowLeft width={16} height={16} />
          Back to home
        </Link>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-[#1E2B3A] bg-[#121B27] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          {/* Status bar */}
          <div className="flex items-center gap-2 border-b border-[#1E2B3A] bg-[#0F1620] px-6 py-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-75" />

              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#34D399]" />
            </span>

            <span className="font-mono text-[10px] uppercase tracking-widest text-[#7C8CA0]">
              Secure authentication
            </span>
          </div>

          {/* Content */}
          <div className="px-6 pb-8 pt-7 sm:px-8">
            {/* Heading */}
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#E6EDF5]">
                Welcome back
              </h1>

              <p className="mt-1.5 text-sm text-[#7C8CA0]">
                Sign in to continue to your HireLoop account.
              </p>
            </div>

            {/* Error */}
            {formError ? (
              <Alert status="danger" className="mt-6">
                <Alert.Indicator />

                <Alert.Content>
                  <Alert.Title className="font-mono text-xs uppercase tracking-wide">
                    Sign in failed
                  </Alert.Title>

                  <Alert.Description>{formError}</Alert.Description>
                </Alert.Content>

                <CloseButton onPress={() => setFormError("")} />
              </Alert>
            ) : null}

            {/* Success */}
            {successMessage ? (
              <Alert status="success" className="mt-6">
                <Alert.Indicator />

                <Alert.Content>
                  <Alert.Title className="font-mono text-xs uppercase tracking-wide">
                    Sign in successful
                  </Alert.Title>

                  <Alert.Description>{successMessage}</Alert.Description>
                </Alert.Content>
              </Alert>
            ) : null}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-5"
              noValidate
            >
              {/* Email */}
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
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    autoComplete="email"
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

              {/* Password */}
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

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                isDisabled={loading}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-[#F5A623] py-2.5 text-sm font-semibold text-[#0A0F17] transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? <Spinner size="sm" /> : null}

                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-[#7C8CA0]">
              New to HireLoop?{" "}
              <Link
                href={`/auth/signup?redirect=${redirectTo}`}
                className="inline-flex items-center gap-1 font-medium text-[#F5A623] hover:underline"
              >
                <PersonPlus width={15} height={15} />
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
