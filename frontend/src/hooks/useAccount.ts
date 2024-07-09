import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { RootState } from "../app/store";
import { setUser, clearUser } from "../features/auth/authSlice";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useAccount = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  const newNameRef = useRef<HTMLIonInputElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState({
    isOpen: false,
    message: "",
  });

  useEffect(() => {
    if (!user) {
      history.push("/home");
    }
  }, [user, history]);

  const handleManageSubscription = async () => {
    if (!user) return;

    console.log("CustomerId:", user.stripeCustomerId);

    try {
      const response = await axios.post(
        "http://localhost:3201/stripe/create-billing-portal-session",
        { customerId: user.stripeCustomerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error creating billing portal session:", error);
    }
  };

  const handleNameUpdate = async () => {
    if (!user) return;
    const newName = newNameRef.current?.value as string;
    if (!newName) return;

    try {
      const response = await axios.put(
        "http://localhost:3201/auth/update-name",
        { userId: user.id, newName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(
        setUser({ user: response.data, token: localStorage.getItem("token")! })
      );
      setEditing(false);
      setShowToast({ isOpen: true, message: "Modified successfully" });
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    try {
      await axios.delete("http://localhost:3201/auth/delete-account", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { userId: user.id },
      });
      dispatch(clearUser());
      history.push("/home");
    } catch (error) {
      console.error("Error deleting account:", error);
      setShowToast({
        isOpen: true,
        message: "Failed to delete account",
      });
    }
  };

  return {
    user,
    editing,
    newNameRef,
    showAlert,
    showToast,
    setEditing,
    setShowAlert,
    setShowToast,
    handleManageSubscription,
    handleNameUpdate,
    handleDeleteAccount,
  };
};

export default useAccount;
