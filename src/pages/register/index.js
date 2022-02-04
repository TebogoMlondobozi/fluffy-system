import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/alerts/alert-message";
import { SignupForm } from "../../components/forms";
import { PageLayout } from "../../components/structure";

export default function Register() {
  const [alertMessage, setAlertMessage] = useState();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <AlertMessage alertMessage={alertMessage} />
      <div
        className="flex flex-col items-center"
        style={{ margin: "20px auto" }}
      >
        <SignupForm
          callback={(message) => {
            setAlertMessage(message);
            setTimeout(() => {
              navigate("/profile", {
                replace: true,
              });
            }, 2000);
          }}
        />
      </div>
    </PageLayout>
  );
}
