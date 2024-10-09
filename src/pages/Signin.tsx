import React, { useRef, useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonInputPasswordToggle,
} from "@ionic/react";
import Header from "../components/Header";
import axios from "axios";
import { useAppDispatch } from "../hooks";
import { setUser } from "../features/auth/authSlice";

const Signin: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const [errors, setErrors] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    if (!email || !password) {
      setErrors("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3201/auth/signin", {
        email,
        password,
      });

      dispatch(
        setUser({ user: response.data.user, token: response.data.token })
      );
      window.location.href = "/home";
    } catch (error) {
      setErrors("Invalid email or password.");
    }
  };

  return (
    <IonPage>
      <Header title="Signin" backUrl="/login" />
      <IonContent className="ion-padding">
        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Signin</h2>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <form onSubmit={handleSubmit}>
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
              className="font"
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
              className="font"
            >
              <IonInputPasswordToggle
                slot="end"
                style={{ color: "#32221e" }}
              ></IonInputPasswordToggle>
            </IonInput>
          </IonItem>

          <IonButton
            type="submit"
            expand="block"
            className="ion-margin-top custom-button-active"
            shape="round"
          >
            Login
          </IonButton>
        </form>

        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>
          Pas de compte ?{" "}
          <a href="/signup" style={{ color: "#32221e" }}>
            S'inscrire
          </a>
        </h2>
      </IonContent>
    </IonPage>
  );
};

export default Signin;
