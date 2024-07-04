import React, { useRef, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonInputPasswordToggle,
} from "@ionic/react";
import { chevronBackSharp } from "ionicons/icons";
import axios from "axios";

const Signup: React.FC = () => {
  const nameRef = useRef<HTMLIonInputElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const [errors, setErrors] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    const name = nameRef.current?.value as string;
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    if (!name || !email || !password) {
      setErrors("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3201/auth/signup", {
        name,
        email,
        password,
      });
      window.location.href = "/signin";
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrors(error.response.data.error);
      } else {
        setErrors("An error occurred. Please try again.");
      }
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
                  Inscription
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Inscription</h2>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonInput
              ref={nameRef}
              label="Name"
              name="name"
              type="text"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter name"
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              ref={emailRef}
              label="Email"
              name="email"
              type="email"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter email"
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              ref={passwordRef}
              label="Password"
              name="password"
              type="password"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter password"
              required
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
          </IonItem>

          <IonButton
            type="submit"
            expand="block"
            className="ion-margin-top custom-button-active"
            shape="round"
          >
            Sign Up
          </IonButton>
        </form>

        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>
          Déjà un compte ? <a href="/signin">Se connecter</a>
        </h2>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
