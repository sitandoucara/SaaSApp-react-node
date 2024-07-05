import React, { useState, useEffect } from "react";
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
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
} from "@ionic/react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { RootState } from "../app/store";
import { personCircleOutline, chevronBackSharp } from "ionicons/icons";
import axios from "axios";
import { clearUser } from "../features/auth/authSlice";

const Account: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(false);

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

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("http://localhost:3201/auth/delete-account", {
        data: { userId: user.id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(clearUser());
      window.location.href = "/home";
    } catch (error) {
      console.error("Error deleting account:", error);
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
                <strong>Name:</strong> {user.name}
              </p>
            </IonLabel>
            <IonLabel>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </IonLabel>
          </IonCardContent>
        </IonCard>
        <IonButton
          type="button"
          className="custom-button-active"
          shape="round"
          expand="block"
          onClick={() => setShowAlert(true)}
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
        <IonAlert
          isOpen={showAlert}
          header={"Delete Account"}
          message={"Are you sure you want to delete your account?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
                setShowAlert(false);
              },
            },
            {
              text: "Delete",
              handler: handleDeleteAccount,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Account;
