import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonTextarea,
} from "@ionic/react";
import { chevronBackSharp } from "ionicons/icons";
import axios from "axios";
//import "./Contact.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<string | null>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors(null);

    if (formData.message.length < 50) {
      setErrors("Message must be at least 50 characters long.");
      return;
    }

    try {
      await axios.post("http://localhost:3201/contact", formData);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setErrors("There was an error sending the message.");
      console.error(error);
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
                  Contacts
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Contact Us</h2>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonInput
              label="name"
              name="name"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter name"
              value={formData.name}
              onIonChange={handleInputChange}
              required
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label="email"
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
              label="subject"
              name="subject"
              labelPlacement="floating"
              fill="outline"
              placeholder="subject"
              value={formData.subject}
              onIonChange={handleInputChange}
              required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonTextarea
              name="message"
              label="message"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter text"
              value={formData.message}
              onIonChange={handleInputChange}
              required
              rows={6}
              minlength={50}
            ></IonTextarea>
          </IonItem>
          <IonButton
            type="submit"
            expand="block"
            className="ion-margin-top custom-button-active"
            shape="round"
          >
            Send
          </IonButton>
        </form>

        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>
          Where to find us?
        </h2>
        <h3 style={{ color: "#7b635a", fontWeight: "bold" }}>Ecole Webstart</h3>
        <p style={{ color: "#7b635a" }}>19 rue Yves Toudic 75010</p>
        <p style={{ color: "red" }}>01 42 41 97 76</p>

        <div id="map" style={{ height: "300px", width: "100%" }}></div>
      </IonContent>
    </IonPage>
  );
};

export default Contact;
