import ListingCard from "@/components/ListingCard";
import Loader from "@/components/Loader";
import { setListings } from "@/redux/features/listingSlice";
import "@/styles/List.scss";
import APIClient from "@/utils/APIClient";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const SearchPage = () => {
  const { searchTerm } = useParams();
  const listings = useSelector((state) => state.listings.listings);

  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const searchListings = async () => {
  //     await APIClient.get(`/listings/search/${searchTerm}`)
  //       .then((res) => {
  //         dispatch(setListings(res.data));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   };
  //   searchListings();
  // }, [dispatch, searchTerm]);

  return (
    <>
      <h1 className="title-list">{searchTerm}</h1>
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

export default SearchPage;
