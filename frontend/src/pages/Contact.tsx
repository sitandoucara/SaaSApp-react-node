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
  IonTextarea,
  useIonToast,
} from "@ionic/react";
import { arrowBackCircleSharp, chevronBackSharp } from "ionicons/icons";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Utiliser l'icône par défaut de Leaflet
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [present] = useIonToast();

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
      presentToast("Message successfully sent!", "top");
    } catch (error) {
      setErrors("There was an error sending the message.");
      console.error(error);
    }
  };

  const presentToast = (message: string, position: "top") => {
    present({
      message: message,
      duration: 2000,
      position: position,
    });
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
                  Contact
                </h3>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2 style={{ fontWeight: "bold", color: "#32221e" }}>Contact Us</h2>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonInput
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onIonChange={handleInputChange}
              required
              className="font"
            />
          </IonItem>

          <IonItem>
            <IonInput
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onIonChange={handleInputChange}
              required
              className="font"
            />
          </IonItem>
          <IonItem>
            <IonInput
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onIonChange={handleInputChange}
              required
              className="font"
            />
          </IonItem>
          <IonItem>
            <IonTextarea
              name="message"
              placeholder="Enter message"
              value={formData.message}
              onIonChange={handleInputChange}
              required
              rows={6}
              minlength={50}
              className="font"
            />
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

        <h2 style={{ fontWeight: "bold", color: "#32221e" }}>
          Where to find us?
        </h2>
        <h4 style={{ color: "#7b635a", fontWeight: "bold" }}>Ecole Webstart</h4>
        <p style={{ color: "#7b635a" }}>19 rue Yves Toudic 75010</p>
        <p style={{ color: "red" }}>01 42 41 97 76</p>

        <div id="map" style={{ height: "300px", width: "100%" }}>
          <MapContainer
            center={[48.87096, 2.36352]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[48.87096, 2.36352]} icon={markerIcon}>
              <Popup>
                Webstart Paris <br /> 19 rue Yves Toudic.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Contact;
