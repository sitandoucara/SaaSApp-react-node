import React, { useState, useEffect, useRef } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonLabel,
  IonIcon,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { RootState } from "../app/store";
import {
  personCircleOutline,
  chevronBackSharp,
  createSharp,
} from "ionicons/icons";
import axios from "axios";
import { setUser } from "../features/auth/authSlice";

const Account: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const newNameRef = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    console.log("User in Account:", user);
  }, [user]);

  if (!user) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>Please log in to view your account details.</h2>
        </IonContent>
      </IonPage>
    );
  }

  const handleManageSubscription = async () => {
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
    const newName = newNameRef.current?.value as string;
    if (!newName) return;

    try {
      console.log("Name before update:", newName);

      const response = await axios.put(
        "http://localhost:3201/auth/update-name",
        { userId: user.id, newName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Mettre à jour l'état local et Redux store
      dispatch(
        setUser({ user: response.data, token: localStorage.getItem("token")! })
      );
      setEditing(false);

      console.log("Name after update:", response.data.name);
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonGrid fixed={true}>
            <IonRow class="ion-justify-content-between">
              <IonCol size="6" className="flex">
                <IonIcon size="large" icon={chevronBackSharp} />
                <h2
                  style={{
                    color: "#7b635a",
                    fontWeight: "bold",
                    margin: "0 10px",
                  }}
                >
                  <a href="/profile" style={{ color: "#7b635a" }}>
                    Back
                  </a>
                </h2>
              </IonCol>

              <IonCol size="6">
                <p
                  style={{
                    color: "#7b635a",
                    fontWeight: "bold",
                    margin: "0 10px",
                  }}
                >
                  My Account
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonIcon icon={personCircleOutline} size="large" />
            <IonCardTitle>Account Details</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              <p>
                <strong>Name:</strong>{" "}
                {editing ? (
                  <IonInput ref={newNameRef} value={user.name} />
                ) : (
                  <>
                    {user.name}
                    <IonIcon
                      icon={createSharp}
                      onClick={() => setEditing(true)}
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        color: "#32221e",
                      }}
                    />
                  </>
                )}
              </p>
            </IonLabel>
            <IonLabel>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </IonLabel>
            {editing && (
              <IonButton
                type="button"
                className="custom-button-active"
                shape="round"
                expand="block"
                onClick={handleNameUpdate}
              >
                Save
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
        <IonButton
          type="button"
          className="custom-button-active"
          shape="round"
          expand="block"
          href="#"
        >
          Delete Account
        </IonButton>
        {user.stripeCustomerId && (
          <IonButton
            type="button"
            className="custom-button-active"
            shape="round"
            expand="block"
            onClick={handleManageSubscription}
          >
            Manage Subscription
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Account;
