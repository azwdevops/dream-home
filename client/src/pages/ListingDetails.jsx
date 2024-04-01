import { facilities } from "@/data";
import "@/styles/ListingDetails.scss";
import APIClient from "@/utils/APIClient";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { DateRange } from "react-date-range";
import Loader from "@/components/Loader";
import { useSelector } from "react-redux";

const ListingDetails = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [listingData, setListingData] = useState({});

  useEffect(() => {
    const fetchListing = async () => {
      await APIClient.get(`/listings/${listingId}`)
        .then((res) => {
          setListingData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchListing();
  }, [listingId]);

  // booking calendar
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // update the selected date range when user make a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);

  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // calculate the difference in days unit

  // submit booking
  const customerId = useSelector((state) => state?.auth?.user?._id);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const bookingForm = {
      customer: customerId,
      host: listingData.creator._id,
      listing: listingData._id,
      startDate: dateRange[0].startDate.toDateString(),
      endDate: dateRange[0].endDate.toDateString(),
      totalPrice: dayCount * listingData?.price,
    };
    await APIClient.post(`/bookings/create`, bookingForm)
      .then((res) => {
        navigate(`/trip-list/${customerId}`);
      })
      .catch((err) => {
        window.alert("Submit booking failed");
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="listing-details">
      <div className="title">
        <h1>{listingData.title}</h1>
        <div></div>
      </div>
      <div className="photos">
        {listingData.listingPhotoPaths?.map((item, index) => (
          <img
            src={`${import.meta.env.VITE_APP_BASE_URL}${item.replace(
              "public",
              ""
            )}`}
            alt={`photo ${index}`}
            key={index}
          />
        ))}
      </div>
      <h2>
        {listingData.type} in {listingData.city}, {listingData.province},{" "}
        {listingData.country}
      </h2>
      <p>
        {listingData.guestCount} guest(s) - {listingData.bedroomCount}{" "}
        bedroom(s) - {listingData.bedCount} bed(s) - {listingData.bathroomCount}{" "}
        bath(s)
      </p>
      <hr />
      <div className="profile">
        <img
          src={`${
            import.meta.env.VITE_APP_BASE_URL
          }${listingData?.creator?.profileImagePath?.replace("public", "")}`}
          alt=""
        />
        <h3>
          Hosted By: {listingData?.creator?.firstName}{" "}
          {listingData?.creator?.lastName}
        </h3>
        <hr />
      </div>
      <hr />
      <h3>Description</h3>
      <p>{listingData?.description}</p>
      <hr />
      <h3>{listingData?.highlight}</h3>
      <p>{listingData?.highlightDescription}</p>
      <hr />
      <div className="booking">
        <div>
          <h2>What this place offers:</h2>
          <div className="amenities">
            {listingData?.amenities[0]?.split(",")?.map((item, index) => (
              <div className="facility" key={index}>
                <div className="facility-icon">
                  {
                    facilities?.find((facility) => facility?.name === item)
                      ?.icon
                  }
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2>How long do you want to stay?</h2>
          <div className="date-range-calendar">
            <DateRange ranges={dateRange} onChange={handleSelect} />
            {dayCount > 1 ? (
              <h2>
                ${listingData.price} x {dayCount} nights
              </h2>
            ) : (
              <h2>
                ${listingData.price} x {dayCount} night
              </h2>
            )}
            <h2>Total price: ${listingData.price * dayCount}</h2>
            <p>Start Date: {dateRange[0]?.startDate?.toDateString()}</p>
            <p>End Date: {dateRange[0]?.endDate?.toDateString()}</p>

            <button className="button" type="button" onClick={handleSubmit}>
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
