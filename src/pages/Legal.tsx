import { IonPage, IonContent } from "@ionic/react";
import Header from "../components/Header";

const Legal: React.FC = () => {
  return (
    <IonPage>
      <Header title="Legals" backUrl="/profile" />
      <IonContent className="ion-padding">
        <h2 style={{ color: "#32221e", fontWeight: "bold" }}>Mentions Légal</h2>
        <p style={{ color: "#7b635a" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque,
          asperiores.
        </p>

        <h2 style={{ color: "#32221e", fontWeight: "bold" }}>
          Conditions générales
        </h2>
        <p style={{ color: "#7b635a" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque,
          asperiores.
        </p>

        <h2 style={{ color: "#32221e", fontWeight: "bold" }}>
          Politique de Confidentialité
        </h2>
        <p style={{ color: "#7b635a" }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum in ex
          minus eaque enim, laboriosam voluptatum asperiores quasi id quibusdam
          mollitia qui ipsum animi praesentium quo quidem officiis ut molestiae
          cum nam velit corporis cumque doloribus. Sed ut, debitis, quam, est
          labore dolorem quisquam veritatis natus voluptatibus cupiditate esse
          tempore?
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Legal;
