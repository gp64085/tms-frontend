import { useState } from "react";
import { Truck } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { AUTH_TOKEN_STORAGE_KEY } from "../constants";
import { LOGIN_MUTATION } from "../graphql/mutation";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/common/ErrorMessage";

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
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 bg-linear-to-b from-blue-100 to-white">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-xl">
        <div className="flex justify-center mb-2 text-blue-600">
          <Truck size={48} />
        </div>
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-700">
          TMS Portal
        </h1>

        {error && <ErrorMessage message={error.message} />}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Username"
            placeholder="admin or john"
            value={formData.username}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                username: e.target.value,
              }))
            }
            hint="Hint: Type 'admin' or 'john'"
          />
          <Input
            type="password"
            label="Password"
            placeholder="password123"
            value={formData.password}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                password: e.target.value,
              }))
            }
          />
          <div className="flex justify-center pt-2">
            <Button type="submit" loading={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
