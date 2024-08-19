import { useState } from "react";
import { isAdmin } from "../../helpers/auth";
import { useNavigate } from "react-router-dom";
import store, { useGetTokenMutation } from "../../store/store";
import Button from "../../components/reuse/Button";
import { useEffect } from "react";
import tokenRequestResponse from "../../store/api/types/tokenRequestResponse";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/store";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getToken, { isLoading, error }] = useGetTokenMutation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // Check if user is already an admin and navigate away if true
    if (isAdmin()) {
      navigate("/admin/home", { replace: true });
    }
  }, [navigate]); // Add navigate as a dependency

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async () => {
    try {
      const response: tokenRequestResponse = await getToken(formData).unwrap();
      // Handle successful login
      if (response.token) {
        // Save the token to local storage or state management
        dispatch(setToken(response.token));
        // Redirect to a protected route
        navigate("/admin/home", { replace: true });
      } else {
        throw new Error("Empty Token Returned");
      }
    } catch (err: any) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <div className="flex flex-col max-w-[36rem] border-2 mx-auto mt-10 p-8">
      <h1 className="text-gray-300 text-3xl mb-2">Admin Access</h1>
      <form className="flex flex-col gap-3 mb-4">
        <input
          name="username"
          type="email"
          placeholder="Username*"
          value={formData.username}
          onChange={handleInputChange}
          className="p-4 text-2xl border-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password*"
          value={formData.password}
          onChange={handleInputChange}
          className="p-4 text-2xl border-2 rounded"
          required
        />
      </form>
      <Button
        primary
        loading={isLoading}
        className="text-3xl w-full self-center text-center h-16 overflow-hidden"
        onClick={isLoading ? undefined : onSubmit}
      >
        <p className="w-full">Login</p>
      </Button>
      {error && <p className="text-red-500">Error: {JSON.stringify(error)}</p>}
    </div>
  );
}
