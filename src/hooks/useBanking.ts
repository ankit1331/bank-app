import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:4000";

// Define the types for the login credentials and user
interface LoginCredentials {
  username: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  accountBalance: number;
  token: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();

  // Mutation function: takes LoginCredentials and returns a User
  const loginMutationFn = async (
    credentials: LoginCredentials
  ): Promise<User> => {
    const response = await axios.get<User[]>(`${API_URL}/users`, {
      params: credentials,
    });
    if (response.data.length === 0) throw new Error("Invalid credentials");
    console.log(response.data[0]);
    return response.data[0];
  };

  return useMutation<User, Error, LoginCredentials>({
    mutationFn: loginMutationFn,
    onSuccess: (data) => {
      // Update the user data in the cache
      queryClient.setQueryData(["user"], data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useTransactions = (userId: number) => {
  return useQuery({
    queryKey: ["transactions", userId],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/transactions`, {
        params: { userId },
      });
      return response.data;
    },
  });
};
