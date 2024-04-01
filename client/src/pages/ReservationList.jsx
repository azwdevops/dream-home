import ListingCard from "@/components/ListingCard";
import Loader from "@/components/Loader";
import { setReservations, setTrips } from "@/redux/features/bookingSlice";
import "@/styles/List.scss";
import APIClient from "@/utils/APIClient";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ReservationList = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const reservations = useSelector((state) => state.bookings.reservations);

  useEffect(() => {
    const fetchReservations = async () => {
      await APIClient.get(`/bookings/reservations/${userId}`)
        .then((res) => {
          dispatch(setReservations(res.data));
        })
        .catch((err) => {
          window.alert("Fetching reservation list failed");
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchReservations();
  }, [userId, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 className="title-list">Reservations list</h1>
      <div className="list">
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation._id}
            creator={reservation?.host?._id}
            listingId={reservation.listing._id}
            startDate={reservation.startDate}
            listingPhotoPaths={reservation.listing.listingPhotoPaths}
            city={reservation.listing.city}
            province={reservation.listing.province}
            country={reservation.listing.country}
            category={reservation.listing.category}
            endDate={reservation.endDate}
            totalPrice={reservation.totalPrice}
            isBooking={true}
          />
        ))}
      </div>
    </>
  );
};

export default ReservationList;
