import { message, Button } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
//import Button from "../../components/Button";
import { BookShowTickets, MakePayment } from "../../apicalls/booking";
import { GetShowById } from "../../apicalls/shows";
//import {  MakePayment } from "../../apicalls/booking";

function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = React.useState(null);
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const showId = params.showId
      const response = await GetShowById(showId);

      console.log({ response })
      if (response.data.success) {
        console.log("This is coming here", response.data)
        setShow(response.data.show);
      } else {
        console.log(response.message)
        message.error("Something went wrong");
      }
    } catch (error) {
        console.log(error)
        message.error("Something went wrong");
    }
  };

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats; // 120
    const rows = Math.ceil(totalSeats / columns); // 10

    return (
        <div>
            <p className="m-4">Screen This Side</p>
            <hr/>
      <div className="flex gap-1 flex-col p-2 card">
        <hr/>
        {Array.from(Array(rows).keys()).map((seat, index) => {
          return (
            <div className="flex gap-1 justify-center">
              {Array.from(Array(columns).keys()).map((column, index) => {
                const seatNumber = seat * columns + column + 1;
                let seatClass = "seat";

                if (selectedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " selected-seat";
                }

                if (show.bookedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + " booked-seat";
                }

                return (
                  seat * columns + column + 1 <= totalSeats && (
                    <div
                      className={seatClass}
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter((item) => item !== seatNumber)
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      <h1 className="text-sm">{seat * columns + column + 1}</h1>
                    </div>
                  )
                );
              })}
            </div>
          );
        })}
      </div>
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      const response = await BookShowTickets({
        show: params.showId,
        seats: selectedSeats,
        transactionId,
        user: user._id,
      });
      console.log({response})
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/profile");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onToken = async (token) => {

    console.log(token)
    try {
      const response = await MakePayment({
        token,
        amount: selectedSeats.length * show.ticketPrice * 100
        });
      if (response.data.success) {
        message.success(response.data.message);
        book(response.data.secret);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log({ show })

  return (
    show && (
      <div>
        {/* show infomation */}

        <div className="flex justify-between card p-2 items-center">
          <div>
            <h1 className="text-sm">{show.theatre.name}</h1>
            <h1 className="text-sm">{show.theatre.address}</h1>
          </div>

          <div>
            <h1 className="text-2xl uppercase">
              {show.movie.title} ({show.movie.language})
            </h1>
          </div>

          <div>
            <h1 className="text-sm">
              {moment(show.date).format("MMM Do yyyy")} -{" "}
              {moment(show.time, "HH:mm").format("hh:mm A")}
            </h1>
          </div>
        </div>

       

         <div className="flex justify-center mt-2">{getSeats()}</div> 

          {selectedSeats.length > 0 && (
          <div className="mt-2 flex justify-center gap-2 items-center flex-col">
            <div className="flex justify-center">
              <div className="flex uppercase card p-2 gap-3">
                <h1 className="text-sm"><b>Selected Seats</b> : {selectedSeats.join(" , ")}</h1>

                <h1 className="text-sm">
                  <b>Total Price</b> : {selectedSeats.length * show.ticketPrice + 200} (Added 200 convenience fee)
                </h1>
              </div>
            </div>
            <StripeCheckout
              token={onToken}
              amount={selectedSeats.length * show.ticketPrice * 100 + 200}
              billingAddress
             stripeKey="pk_test_51LCQ2CSJ2bcgnaheLY5cxPzvHgz6MARXd0Zv7an9AmN5C7F8yzhvpcv6zf8opnZJgplRPDZprPUeEKsLCHqS8ErI00o3RljCFX"
            >
              <Button>Book Now</Button>
            </StripeCheckout>
          </div>
        )}
      </div>
    )
  );
} 

export default BookShow;
