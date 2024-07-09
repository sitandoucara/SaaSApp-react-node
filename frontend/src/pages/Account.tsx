import React from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonLabel,
  IonIcon,
  IonInput,
  IonAlert,
  IonToast,
} from "@ionic/react";
import { createSharp, personCircleSharp } from "ionicons/icons";
import Header from "../components/Header";
import useAccount from "../hooks/useAccount";

const Account: React.FC = () => {
  const {
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
  } = useAccount();

  if (!user) return null;

  return (
    <IonPage>
      <Header title="My Account" backUrl="/profile" />
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
