import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/forms";
import { PageLayout } from "../../components/structure";
import useAuth from "../../hooks/use-auth";

export default function Login() {
  const { signin } = useAuth();

  return (
    <PageLayout>
      <div className="flex flex-col items-center p-36">
        <LoginForm {...{ signin }} />
      </div>
    </PageLayout>
  );
}
