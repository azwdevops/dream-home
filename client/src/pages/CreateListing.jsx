import "@/styles/CreateListing.scss";
import { categories, facilities, types } from "@/data";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import variables from "@/styles/variables.module.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import APIClient from "@/utils/APIClient";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const creatorId = useSelector((state) => state?.auth?.user._id);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [amenities, setAmenities] = useState([]);

  // UPLOAD, DEAG, DROP AND REMOVE PHOTOS
  const [photos, setPhotos] = useState([]);

  const handleChangeLocation = (e) => {
    setFormLocation({ ...formLocation, [e.target.name]: e.target.value });
  };

  const handleSelectAmenities = (facility) => {
    if (amenities?.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prevAmenities) => [...prevAmenities, facility]);
    }
  };

  const handleChangePhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(photos);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);
    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  // description
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDescription: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({ ...formDescription, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // create a new form data object to handle file upload
      const listingFormData = new FormData();
      listingFormData.append("creator", creatorId);
      listingFormData.append("category", category);
      listingFormData.append("type", type);
      listingFormData.append("streetAddress", formLocation.streetAddress);
      listingFormData.append("aptSuite", formLocation?.aptSuite);
      listingFormData.append("city", formLocation.city);
      listingFormData.append("province", formLocation.province);
      listingFormData.append("country", formLocation.country);
      listingFormData.append("guestCount", guestCount);
      listingFormData.append("bedroomCount", bedroomCount);
      listingFormData.append("bedCount", bedCount);
      listingFormData.append("bathroomCount", bathroomCount);
      listingFormData.append("amenities", amenities);
      listingFormData.append("title", formDescription.title);
      listingFormData.append("description", formDescription.description);
      listingFormData.append("highlight", formDescription.highlight);
      listingFormData.append(
        "highlightDescription",
        formDescription.highlightDescription
      );
      listingFormData.append("price", formDescription.price);
      // append each selected photo to the form data object
      photos.forEach((photo) => {
        listingFormData.append("listingPhotos", photo);
      });
      // send a post request to server
      await APIClient.post("/listings/create", listingFormData)
        .then((res) => {
          window.alert("Listing created successfully");
          navigate("/");
        })
        .catch((err) => {
          window.alert("Unable to create listing");
        });
    } catch (error) {
      window.alert("Unable to create listing");
    }
  };

  return (
    <>
      <div className="create-listing">
        <h1>Publish your Place</h1>
        <form>
          <div className="create-listing-step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    item.label === category && "selected"
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category-icon">{item?.icon}</div>
                  <p>{item?.label}</p>
                </div>
              ))}
            </div>
            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${item.name === type && "selected"}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type-text">
                    <h4>{item?.name}</h4>
                    <p>{item?.description}</p>
                  </div>
                  <div className="type-icon">{item.icon}</div>
                </div>
              ))}
            </div>
            <h3>Where's your place located</h3>
            <div className="full">
              <div className="location">
                <p>Street address</p>
                <input
                  type="text"
                  placeholder="Street address"
                  name="streetAddress"
                  onChange={handleChangeLocation}
                  value={formLocation.streetAddress}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc, (if applicable)</p>
                <input
                  type="text"
                  placeholder="apt, suite, etc (if applicable)"
                  name="aptSuite"
                  onChange={handleChangeLocation}
                  value={formLocation.aptSuite}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="city"
                  name="city"
                  onChange={handleChangeLocation}
                  value={formLocation.city}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="province"
                  name="province"
                  onChange={handleChangeLocation}
                  value={formLocation.province}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="country"
                  name="country"
                  onChange={handleChangeLocation}
                  value={formLocation.country}
                  required
                />
              </div>
            </div>
            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic-count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                    onClick={() =>
                      guestCount > 1 && setGuestCount(guestCount - 1)
                    }
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                    onClick={() => setGuestCount(guestCount + 1)}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic-count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                    onClick={() =>
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1)
                    }
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                    onClick={() => setBedroomCount(bedroomCount + 1)}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Beds</p>
                <div className="basic-count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                    onClick={() => bedCount > 1 && setBedCount(bedCount - 1)}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                    onClick={() => setBedCount(bedCount + 1)}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic-count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                    onClick={() =>
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1)
                    }
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                    onClick={() => setBathroomCount(bathroomCount + 1)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="create-listing-step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities?.includes(item?.name) && "selected"
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility-icon">{item.icon}</div>
                  <p>{item?.name}</p>
                </div>
              ))}
            </div>
            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos?.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleChangePhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                    {photos?.length >= 1 && (
                      <>
                        {photos?.map((photo, index) => (
                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="photo"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided?.dragHandleProps}
                              >
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="place"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemovePhoto(index)}
                                >
                                  <BiTrash />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleChangePhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <h3>What makes your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="title"
                name="title"
                onChange={handleChangeDescription}
                value={formDescription.title}
                required
              />
              <p>Description</p>
              <textarea
                placeholder="description"
                name="description"
                onChange={handleChangeDescription}
                value={formDescription.description}
                required
              />
              <p>Highlight</p>
              <input
                type="text"
                placeholder="highlight"
                name="highlight"
                onChange={handleChangeDescription}
                value={formDescription.highlight}
                required
              />
              <p>Highlight details</p>
              <textarea
                placeholder="highlight details"
                name="highlightDescription"
                onChange={handleChangeDescription}
                value={formDescription.highlightDescription}
                required
              />
              <p>Now, set your price</p>
              <span>$</span>
              <input
                type="number"
                name="price"
                placeholder="100"
                className="price"
                onChange={handleChangeDescription}
                value={formDescription.price}
                min={0}
              />
            </div>
          </div>
          <button type="button" className="submit-btn" onClick={handleSubmit}>
            Create Your Listing
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
