"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { cx } from "../context";
import { PiSpinnerThin } from "react-icons/pi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TourDetail = ({ params }) => {
  const [tourData, setTourData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const { globalState, setGlobalState } = useContext(cx);
  const [showFeedback, setShowFeedback] = useState(false);

  const handlePurchase = async () => {
    try {
      setPending(true);
      const userId = globalState;

      // Kullanıcının bütçesini ve tur ID'sini kontrol et
      const budgetCheckResponse = await axios.get(
        `http://localhost:5277/Api/checkBudget?userId=${userId}&tourId=${params.id}`
      );

      const canAfford = budgetCheckResponse.data;

      if (canAfford) {
        // Satın alma işlemi gerçekleştirilirse, backend'de bir Purchase metodunu çağırabilirsiniz.
        // Bu metod kullanıcı ID'sini ve tur ID'sini alabilir ve satın alma işlemini gerçekleştirebilir.
        // Örneğin: await axios.post(`http://localhost:5277/Api/purchase`, { userId, tourId: params.id });

        setPurchaseSuccess(true);
        setPending(false);
        setShowFeedback(true);
      } else {
        console.log("Insufficient budget for purchase.");
        // Kullanıcının bütçesi yetersizse uygun bir mesaj gösterebilirsiniz.
        setPending(false);
        setShowFeedback(true);
      }
    } catch (error) {
      console.error("Error making purchase:", error);
      setPending(false);
    }
  };

  useEffect(() => {
    // Component ilk render edildiğinde çalışacak kod
    const fetchTourData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5277/Api/tour/${params.id}`
        );
        setTourData(response.data);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    fetchTourData(); // fetchTourData fonksiyonunu çağır
  }, [params.id]); // useEffect'i sadece params.id değiştikçe çalışacak şekilde yapılandır

  return (
    <div>
      {tourData ? (
        <div className="flex items-center justify-center mt-10 relative">
          <div className="w-[500px] h-[700px] overflow-hidden rounded-xl">
            <Image src={tourData.imageUrl} width={500} height={500} />
          </div>
          <div className="w-[500px] h-[700px] bg-slate-100 ml-32">
            <h1 className="text-5xl font-bold p-3">{tourData.name}</h1>
            <p className="text-2xl mt-3 p-3">${tourData.price}</p>
            <p className="text-xl  mt-3 mr-2 p-3 text-justify">
              {tourData.description}
            </p>
            <div className="w-full flex justify-end pr-8 pt-8">
              <Button onClick={handleOpen} variant="outlined" className="w-60">
                Purchase Now!
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Confirm
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Aer you sure you want to purchase?
                    <div className="w-full flex justify-end mt-6 mb-6 pr-8">
                      <Button
                        onClick={handlePurchase}
                        variant="outlined"
                        className="w-[100px] h-10"
                      >
                        {pending ? (
                          <div className="text-2xl w-full text-center">
                            <PiSpinnerThin />
                          </div>
                        ) : (
                          <p>Purchase</p>
                        )}
                      </Button>
                    </div>
                    <div>
                      {showFeedback && (
                        <>
                          {purchaseSuccess ? (
                            <p className="text-green-500">
                              Your payment has been processed successfully
                            </p>
                          ) : (
                            <p className="text-red-500">
                              Please make sure you have enough funds in your
                              account
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-3xl">
          <PiSpinnerThin />
        </div>
      )}
    </div>
  );
};

export default TourDetail;
