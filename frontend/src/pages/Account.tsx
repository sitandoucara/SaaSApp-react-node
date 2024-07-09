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
  IonAlert,
  IonToast,
} from "@ionic/react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { RootState } from "../app/store";
import {
  createSharp,
  arrowBackCircleSharp,
  personCircleSharp,
} from "ionicons/icons";
import axios from "axios";
import { setUser, clearUser } from "../features/auth/authSlice";

const Account: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const newNameRef = useRef<HTMLIonInputElement>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState({
    isOpen: false,
    message: "",
  });

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

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("http://localhost:3201/auth/delete-account", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { userId: user.id },
      });
      dispatch(clearUser());
      window.location.href = "/home";
    } catch (error) {
      console.error("Error deleting account:", error);
      setShowToast({
        isOpen: true,
        message: "Failed to delete account",
      });
    }
  };

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonGrid fixed={true}>
            <IonRow class="ion-justify-content-between">
              <IonCol size="6" className="flex">
                <h2 style={{ fontWeight: "bold", margin: "0 10px" }}>
                  <a href="/profile" style={{ color: "#32221e" }}>
                    <IonIcon size="large" icon={arrowBackCircleSharp} />
                  </a>
                </h2>
              </IonCol>

              <IonCol size="6">
                <h3
                  style={{
                    fontWeight: "bold",
                    margin: "0 10px",
                    color: "#32221e",
                  }}
                >
                  My Account
                </h3>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard className="font shadow_none" style={{ background: "#FBF8F5" }}>
          <IonCardHeader>
            <div className="flex" style={{ color: "#7b635a" }}>
              <IonIcon icon={personCircleSharp} size="large" />
              <IonCardTitle>Account Details</IonCardTitle>
            </div>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              <h2>
                <strong>Name:</strong>{" "}
                {editing ? (
                  <IonInput
                    ref={newNameRef}
                    value={user.name}
                    className="font"
                    style={{ color: "#7b635a" }}
                  />
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
              </h2>
            </IonLabel>
            <IonLabel>
              <h2>
                <strong>Email:</strong> {user.email}
              </h2>
            </IonLabel>
            {editing && (
              <IonButton
                type="button"
                className="custom-button-active"
                shape="round"
                expand="block"
                onClick={handleNameUpdate}
                style={{ margin: "5px 0px" }}
              >
                Save
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
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
        <IonButton
          type="button"
          className="custom-button-active2"
          shape="round"
          expand="block"
          onClick={() => setShowAlert(true)}
        >
          Delete Account
        </IonButton>
        <IonAlert
          className="font"
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Confirm Delete"}
          message={"Are you sure you want to delete your account?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                setShowAlert(false);
              },
            },
            {
              text: "Delete",
              cssClass: "danger",
              handler: () => {
                handleDeleteAccount();
                setShowAlert(false);
              },
            },
          ]}
        />
        <IonToast
          isOpen={showToast.isOpen}
          message={showToast.message}
          duration={2000}
          onDidDismiss={() => setShowToast({ isOpen: false, message: "" })}
        />
      </IonContent>
    </IonPage>
  );
};

export default Account;
