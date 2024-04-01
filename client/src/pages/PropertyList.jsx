import ListingCard from "@/components/ListingCard";
import Loader from "@/components/Loader";
import { setMyProperties } from "@/redux/features/listingSlice";
import "@/styles/List.scss";
import APIClient from "@/utils/APIClient";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const myProperties = useSelector((state) => state?.listings?.myProperties);

  useEffect(() => {
    const fetchMyProperties = async () => {
      await APIClient.get(`/bookings/get-my-properties/${user._id}`)
        .then((res) => {
          dispatch(setMyProperties(res.data));
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    };
    fetchMyProperties();
  }, [dispatch, user?._id]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 className="title-list">My Property List</h1>
      <div className="list">
        {myProperties?.map((listing) => (
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

export default PropertyList;
