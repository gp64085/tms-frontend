import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN_STORAGE_KEY } from "../constants";
import { LOGIN_MUTATION } from "../graphql/mutation";
import { Input } from "../components/common/Input";
import { AuthLayout } from "../components/layout/AuthLayout";
import { AuthForm } from "../components/common/AuthForm";

interface LoginResponse {
  login: {
    token: string;
    user: {
      role: string;
      username: string;
    };
  };
}

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [login, { loading, error }] =
    useMutation<LoginResponse>(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { username: formData.username, password: formData.password },
      });

      if (!data?.login) return;
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, data.login.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthLayout title="TMS Portal" subtitle="Sign in to your account">
      <AuthForm
        onSubmit={handleLogin}
        loading={loading}
        error={error?.message}
        submitText="Sign In"
        loadingText="Signing in..."
        footer={
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        }
      >
        <Input
          label="Username"
          placeholder="admin or john"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          hint="Hint: Type 'admin' or 'john'"
        />
        <Input
          type="password"
          label="Password"
          placeholder="password123"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </AuthForm>
    </AuthLayout>
  );
}
