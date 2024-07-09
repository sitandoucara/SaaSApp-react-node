import { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setUser } from "../features/auth/authSlice";
import { useHistory } from "react-router-dom";

// Hook pour gérer la logique de la page de succès après le paiement
const useSuccess = () => {
  const [session, setSession] = useState<any>(null);
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/home");
      return;
    }

    /*Récuperation les informations de la session de paiement Stripe &
mis à jour l'ID du client Stripe du user si nécessaire*/
    const fetchSession = async () => {
      if (sessionId && !session) {
        try {
          const response = await axios.get(
            `http://localhost:3201/stripe/checkout-session?sessionId=${sessionId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setSession(response.data);

          if (user && !user.stripeCustomerId) {
            await axios.post(
              `http://localhost:3201/stripe/update-stripe-customer-id`,
              { userId: user.id, stripeCustomerId: response.data.customer },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            dispatch(
              setUser({
                user: { ...user, stripeCustomerId: response.data.customer },
                token: localStorage.getItem("token")!,
              })
            );
          }
        } catch (error) {
          console.error("Error fetching checkout session:", error);
        }
      }
    };

    fetchSession();
  }, [sessionId, dispatch, user, session, history]);

  // Gestion de la redirection vers le portail stripe
  const handleManageSubscription = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3201/stripe/create-billing-portal-session",
        { customerId: user?.stripeCustomerId },
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

  return { session, handleManageSubscription };
};

export default useSuccess;
