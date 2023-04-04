import React from "react";
import useCacheStore from "../../zustand/useCacheStore";

import { ArrowLeft } from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import { js2xml } from "xml-js";

import CryptoJS from "crypto-js";

import paymentService from "../../services/payment/payment.service";

import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const CheckOutPage = () => {
  const { checkoutRoom, resortDetails, alert, setAlert, clearCache } =
    useCacheStore();

  const days =
    (checkoutRoom.checkOut.getTime() - checkoutRoom.checkIn.getTime()) /
    (1000 * 3600 * 24);
  const total = checkoutRoom.rooms.reduce(function (prev, current) {
    return prev + +current.price;
  }, 0);

  const Razorpay = useRazorpay();
  const currentUser = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handlePayment = async () => {
    const paymentInfo = {
      amount: total,
    };

    const json = {
      paymentRequest: paymentInfo,
    };

    const xml = js2xml(json, { compact: true, ignoreComment: true });
    console.log(xml);

    await paymentService
      .createOrder(xml)
      .then((response) => {
        const order = response.data;

        const options: RazorpayOptions = {
          key: process.env.RAZORPAY_CLIENT_ID!,
          amount: order.amount,
          currency: order.currency,
          name: "Locus Haunt",
          description: "Test Transaction",
          image: "https://i.ibb.co/25SV90T/oie-f-CAaxhcl-GNkh.png",
          order_id: order.id,
          handler: async function (response: any) {
            console.log(response);

            const paymentCaptureRequest = {
              total,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              checkIn: checkoutRoom.checkIn.toISOString().substring(0, 10),
              checkOut: checkoutRoom.checkOut.toISOString().substring(0, 10),
              userId: currentUser.id,
              resortId: checkoutRoom.resortId,
              rooms: checkoutRoom.rooms.map((room) => {
                return {
                  price: room.price,
                  roomId: room.id,
                };
              }),
            };

            console.log(paymentCaptureRequest);

            const iv = CryptoJS.enc.Utf8.parse(
              process.env.AES_IV || "myiv123456789010"
            );
            const key = CryptoJS.enc.Utf8.parse(
              process.env.AES_SECRET_KEY || "mysecretkey01234"
            );

            const encryptedData = CryptoJS.AES.encrypt(
              JSON.stringify(paymentCaptureRequest),
              key,
              {
                iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
              }
            );

            const cipherText = encryptedData.toString();

            await paymentService
              .capturePayment(cipherText)
              .then((response) => {
                if (response.status === 201) {
                  navigate("/bookings");
                }
              })
              .catch((error) => {
                setAlert({
                  type: "error",
                  message:
                    "Payment Completed. Unfortunately order is not completed. Contact us for more info.",
                  show: true,
                });
              });
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          notes: {
            address: "Locus Haunt Office",
          },
          theme: {
            color: "rgb(1 68 81 / 1)",
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response: any) {
          setAlert({
            type: "error",
            message: response.error.reason,
            show: true,
          });
        });

        rzp1.open();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {alert.show && (
        <Collapse in={alert.show} className="relative mt-5">
          <Alert
            severity={alert.type}
            action={
              <IconButton
                aria-label="close"
                color={alert.type}
                size="small"
                onClick={() => {
                  setAlert({
                    message: "",
                    show: false,
                    type: "info",
                  });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alert.message}
          </Alert>
        </Collapse>
      )}

      <div className="w-full min-h-screen bg-gray-50 py-5">
        <div className="px-5">
          <div className="mb-2">
            <button className="btn focus:outline-none bg-transparent text-gray-900 border-none hover:text-gray-500 text-sm">
              <ArrowLeft />
              Back
            </button>
          </div>
          <div className="mb-2">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
              Checkout.
            </h1>
          </div>
        </div>
        <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
          <div className="w-full">
            <div className="-mx-3 md:flex items-start">
              <div className="px-3 md:w-7/12 lg:pr-10">
                {checkoutRoom.rooms.map((room, index) => (
                  <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                    <div className="w-full flex items-center">
                      <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                        <img src={room.images[0].originalImageLink} alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-semibold uppercase text-gray-600">
                          {room.roomCode}
                        </h6>
                        <p className="text-gray-400">x {days} nights</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-600 text-xl">
                          INR {room.price}
                        </span>
                        <span className="font-semibold text-gray-600 text-sm">
                          .00
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                  <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Subtotal</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">INR {total}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Total</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold text-gray-400 text-sm">
                        INR
                      </span>{" "}
                      <span className="font-semibold">{total}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-5/12">
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-3 items-center">
                    <div className="w-32">
                      <span className="text-gray-600 font-semibold">
                        Resort
                      </span>
                    </div>
                    <div className="flex-grow pl-3">
                      <span>{resortDetails.name}</span>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="w-32">
                      <span className="text-gray-600 font-semibold">
                        Location
                      </span>
                    </div>
                    <div className="flex-grow pl-3">
                      <span>{resortDetails.locationDetails.location}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                  <div className="w-full p-3">
                    <label
                      htmlFor="type2"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                        id="type2"
                        checked
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                        width={80}
                        className="ml-3"
                        alt=""
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    onClick={handlePayment}
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"
                  >
                    PAY&nbsp;
                    <CurrencyRupeeIcon className="text-sm" />
                    {total}&nbsp; NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
