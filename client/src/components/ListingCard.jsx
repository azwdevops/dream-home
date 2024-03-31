import "@/styles/ListingCard.scss";

const ListingCard = ({
  id,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
}) => {
  return (
    <div className="listing-card">
      <div className="slider-container">
        <div className="slider"></div>
      </div>
    </div>
  );
};

export default ListingCard;
