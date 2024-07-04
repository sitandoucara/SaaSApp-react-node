import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
//import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setUser } from "../features/auth/authSlice";
import { checkmarkSharp } from "ionicons/icons";

const Success: React.FC = () => {
  //const history = useHistory();
  const [session, setSession] = useState<any>(null);
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchSession = async () => {
      if (sessionId) {
        try {
          const response = await axios.get(
            `http://localhost:3201/stripe/checkout-session?sessionId=${sessionId}`
          );
          setSession(response.data);
          if (user) {
            dispatch(
              setUser({
                user: { ...user, stripeCustomerId: response.data.customer },
                token: localStorage.getItem("token")!,
              })
            );
          }
          console.log("Checkout Session Response:", response.data);
        } catch (error) {
          console.error("Error fetching checkout session:", error);
        }
      }
    };

    fetchSession();
  }, [sessionId, dispatch, user]);

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Payment Success</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonIcon icon={checkmarkSharp} size="large" />
            <IonCardTitle>Payment Succeeded!</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              <p>
                <strong>Amount Paid:</strong>{" "}
                {(session?.amount_total / 100).toFixed(2)}{" "}
                {session?.currency.toUpperCase()}
              </p>
            </IonLabel>
            <IonLabel>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(session?.created * 1000).toLocaleDateString()}
              </p>
            </IonLabel>
            <IonButton
              type="button"
              className="custom-button-active"
              shape="round"
              expand="block"
              href="/home"
            >
              Home
            </IonButton>
            <IonButton
              type="button"
              className="custom-button-active"
              shape="round"
              expand="block"
              onClick={handleManageSubscription}
            >
              More
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Success;
