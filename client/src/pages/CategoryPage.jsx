import ListingCard from "@/components/ListingCard";
import Loader from "@/components/Loader";
import { setListings } from "@/redux/features/listingSlice";
import "@/styles/List.scss";
import APIClient from "@/utils/APIClient";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const listings = useSelector((state) => state?.listings?.listings);

  useEffect(() => {
    const getFeedListings = async () => {
      setLoading(true);

      await APIClient.get(`/listings?category=${category}`)
        .then((res) => {
          dispatch(setListings({ listings: res.data }));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getFeedListings();
  }, [dispatch, category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 className="title-list">{category} listings</h1>
      <div className="list">
        {listings?.map((listing) => (
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

export default CategoryPage;
