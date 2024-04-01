import { setWishList } from "@/redux/features/bookingSlice";
import "@/styles/ListingCard.scss";
import APIClient from "@/utils/APIClient";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Favorite,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  isBooking,
  startDate,
  endDate,
  totalPrice,
}) => {
  const dispatch = useDispatch();

  // slider for images
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevAsNext, setPrevAsNext] = useState(false);
  const [nextAsPrev, setNextAsPrev] = useState(false);

  const goToPrevSlide = async () => {
    if (currentIndex === listingPhotoPaths.length - 1) {
      setPrevAsNext(false);
      setNextAsPrev(false);
      setCurrentIndex(currentIndex - 1);
    } else if (currentIndex === 0) {
      setCurrentIndex(1);
      setPrevAsNext(true);
      setNextAsPrev(false);
    } else if (prevAsNext) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(currentIndex - 1);
      setPrevAsNext(false);
    }
    setNextAsPrev(false);
  };

  const goToNextSlide = () => {
    if (currentIndex === listingPhotoPaths.length - 1) {
      setNextAsPrev(true);
      setPrevAsNext(false);
      setCurrentIndex(currentIndex - 1);
    } else if (currentIndex === 0) {
      setCurrentIndex(1);
      setNextAsPrev(false);
      setPrevAsNext(false);
    } else if (nextAsPrev) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(currentIndex + 1);
      setNextAsPrev(false);
    }
    setPrevAsNext(false);
  };

  // add to wish list
  const user = useSelector((state) => state.auth.user);
  const wishList = useSelector((state) => state.bookings?.wishList) || [];

  // check if item is in user wishlist
  const inWishList = wishList.find((item) => item?._id === listingId);

  const changeWishList = async () => {
    if (user?._id !== creator?._id) {
      await APIClient.patch(
        `/bookings/add-to-wishlist/${user._id}/${listingId}`
      )
        .then((res) => {
          dispatch(setWishList(res?.data?.wishList));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}${photo?.replace(
                  "public",
                  ""
                )}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link to={`/listings/${listingId}`}>
        <h3>
          {city}, {province}, {country}
        </h3>
        <p>{category}</p>

        {!isBooking ? (
          <>
            <p>{type}</p>
            <p>
              <span>${price}</span> per night
            </p>
          </>
        ) : (
          <>
            <p>
              {startDate} - {endDate}
            </p>
            <p>
              <span>${totalPrice}</span> total
            </p>
          </>
        )}
      </Link>
      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          changeWishList();
        }}
        disabled={!user}
      >
        {inWishList ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard;
