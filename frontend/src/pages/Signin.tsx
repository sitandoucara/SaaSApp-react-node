import React, { useState } from "react";
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
import { useAppDispatch } from "../hooks";
import { setUser } from "../features/auth/authSlice";

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors(null);

    //console.log("Form data before sending:", formData);

    if (!formData.email || !formData.password) {
      setErrors("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3201/auth/signin",
        formData
      );

      //console.log("API Response:", response.data);

      dispatch(
        setUser({ user: response.data.user, token: response.data.token })
      );

      /*console.log("Dispatched setUser with:", {
        user: response.data.user,
        token: response.data.token,
      });*/

      window.location.href = "/home";
    } catch (error) {
      setErrors("Invalid email or password.");
      //console.error("Error during sign-in:", error);
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
                  Connexion
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Connexion</h2>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonInput
              label="Email"
              name="email"
              type="email"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter email"
              value={formData.email}
              onIonChange={handleInputChange}
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Password"
              name="password"
              type="password"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter password"
              value={formData.password}
              onIonChange={handleInputChange}
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
            Login
          </IonButton>
        </form>

        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>
          Pas de compte ? <a href="/signup">S'inscrire</a>
        </h2>
      </IonContent>
    </IonPage>
  );
};

export default Signin;
