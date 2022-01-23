import React from "react";
import { PageLayout } from "../../components/structure";
import useAuth from "../../hooks/use-auth";

export default function MyAccount() {
  const { user } = useAuth();

  return (
    <PageLayout>
      <div className="flex flex-col w-2/3">
        <h1 className="text-right">
          Welcome {user.firstname} {user.lastname}
        </h1>
      </div>

      <hr />
      <div className="flex flex-col justify-center w-2/3">
        <h1 className="text-left">My orders</h1>
        <div className="flex flex-col justify-end">
          <div>Order item A -----</div>
          <div>Order item B -----</div>
          <div>Order item C -----</div>
          <div>Order item D -----</div>
          <div>Order item E -----</div>
          <div>Order item F -----</div>
          <div>Order item . -----</div>
          <div>Order item . -----</div>
          <div>Order item . -----</div>
          <div>Order item . -----</div>
          <div>Order item . -----</div>
         
        </div>
      </div>
    </PageLayout>
  );
}
