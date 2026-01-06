import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN_STORAGE_KEY } from "../constants";
import { SIGNUP_MUTATION } from "../graphql/mutation";
import { Input } from "../components/common/Input";
import { AuthLayout } from "../components/layout/AuthLayout";
import { AuthForm } from "../components/common/AuthForm";

interface SignUpResponse {
  signUp: {
    token: string;
    user: {
      role: string;
      username: string;
    };
  };
}

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [signUp, { loading, error }] = useMutation<SignUpResponse>(SIGNUP_MUTATION);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { data } = await signUp({
        variables: { 
          username: formData.username, 
          password: formData.password 
        },
      });

      if (!data?.signUp) return;
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, data.signUp.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join TMS Portal today">
      <AuthForm
        onSubmit={handleSignUp}
        loading={loading}
        error={error?.message}
        submitText="Sign Up"
        loadingText="Creating Account..."
        footer={
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        }
      >
        <Input
          label="Username"
          placeholder="Enter username"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          required
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
          }
          required
        />
      </AuthForm>
    </AuthLayout>
  );
}
