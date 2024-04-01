import ListingCard from "@/components/ListingCard";
import Loader from "@/components/Loader";
import { setTrips } from "@/redux/features/bookingSlice";
import "@/styles/List.scss";
import APIClient from "@/utils/APIClient";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TripList = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const trips = useSelector((state) => state.bookings.trips);

  useEffect(() => {
    const fetchTrips = async () => {
      await APIClient.get(`/bookings/get-my-trip-list/${userId}`)
        .then((res) => {
          dispatch(setTrips(res.data));
        })
        .catch((err) => {
          window.alert("Fetching trip list failed");
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchTrips();
  }, [userId, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 className="title-list">Your trip list</h1>
      <div className="list">
        {trips?.map((trip) => (
          <ListingCard
            key={trip._id}
            listingId={trip.listing._id}
            creator={trip.host._id}
            startDate={trip.startDate}
            listingPhotoPaths={trip.listing.listingPhotoPaths}
            city={trip.listing.city}
            province={trip.listing.province}
            country={trip.listing.country}
            category={trip.listing.category}
            endDate={trip.endDate}
            totalPrice={trip.totalPrice}
            isBooking={true}
          />
        ))}
      </div>
    </>
  );
};

export default TripList;
