import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      if (data?.user?.identities?.length === 0) {
        toast.error("Account already exists!");
        return;
      }
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
    },
  });

  return { signup, isLoading };
}
