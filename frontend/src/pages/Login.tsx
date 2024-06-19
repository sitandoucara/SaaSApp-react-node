import { IonContent, IonPage, IonButton } from "@ionic/react";
import "./Login.css";

const Login = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="login-container">
          <h1>Welcome</h1>
          <h2>to FuniiLearn!</h2>
          <p>Play, Learn and Explore with Exciting Quizz</p>
          <div className="button-container">
            <IonButton className="custom-button" routerLink="/signup">
              Sign Up
            </IonButton>
            <IonButton
              expand="block"
              className="custom-button"
              routerLink="/signin"
            >
              Sign In
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
