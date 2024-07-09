import { useState } from "react";
import axios from "axios";
import { useIonToast } from "@ionic/react";

const useContact = () => {
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

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
  };
};

export default useContact;
