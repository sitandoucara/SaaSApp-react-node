import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonTextarea,
} from "@ionic/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from "../components/Header";
import useContact from "../hooks/useContact";

// Utilisation de l'icône par défaut de Leaflet
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
  const { formData, errors, handleInputChange, handleSubmit } = useContact();

  return (
    <IonPage>
      <Header title="Contact" backUrl="/profile" />

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

        {/* Carte intégrée avec Leaflet */}
        <div id="map" style={{ height: "300px", width: "100%" }}>
          <MapContainer
            center={[48.87096, 2.36352]}
            zoom={15}
            style={{ height: "300px", width: "100%" }}
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
