import ListingCard from "@/components/ListingCard";
import Loader from "@/components/Loader";
import { setWishList } from "@/redux/features/bookingSlice";
import "@/styles/List.scss";
import APIClient from "@/utils/APIClient";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const WishList = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const wishList = useSelector((state) => state?.bookings?.wishList);

  useEffect(() => {
    const fetchTrips = async () => {
      await APIClient.get(`/bookings/get-my-wishlist/${userId}`)
        .then((res) => {
          dispatch(setWishList(res.data));
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
      <h1 className="title-list">My Wish List</h1>
      <div className="list">
        {wishList?.map((listing) => (
          <ListingCard
            key={listing?._id}
            creator={listing?.creator}
            listingId={listing._id}
            listingPhotoPaths={listing.listingPhotoPaths}
            city={listing.city}
            province={listing.province}
            country={listing.country}
            category={listing.category}
            isBooking={false}
          />
        ))}
      </div>
    </>
  );
};

export default WishList;
