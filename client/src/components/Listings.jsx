import { categories } from "@/data";
import "@/styles/Listings.scss";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import APIClient from "@/utils/APIClient";
import { useSelector } from "react-redux";
import { setListings } from "@/redux/features/listingSlice";
import ListingCard from "./ListingCard";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings.listings);

  useEffect(() => {
    const getFeedListings = async () => {
      setLoading(true);
      const getUrl =
        selectedCategory !== "All"
          ? `/listings?category=${selectedCategory}`
          : `/listings`;

      await APIClient.get(getUrl)
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
  }, [dispatch, selectedCategory]);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category-icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map((listing) => (
            <ListingCard
              key={listing?._id}
              id={listing._id}
              creator={listing.creator}
              listingPhotoPaths={listing.listingPhotoPaths}
              city={listing.city}
              province={listing.province}
              country={listing.country}
              price={listing.price}
              type={listing.type}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Listings;
