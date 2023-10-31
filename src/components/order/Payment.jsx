import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initPayment } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
const Payment = () => {
  const [sessionSuccess, setSessionSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    initPayment(userInfo().token)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setSessionSuccess(true);
          setRedirectUrl(response.data.GatewayPageURL);
          setFailed(false);
        }
      })
      .catch((err) => {
        setFailed(true);
        setSessionSuccess(false);
      });
  }, []);

  return (
    <div>
      {sessionSuccess
        ? window.location = redirectUrl
        : "Payment is processing"}
      {failed ? (
        <p>
          Failed to start payment session!<Link to="/cart">Go to cart.</Link>
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Payment;
