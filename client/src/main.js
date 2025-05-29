import { hotels } from "./hotelsArray.js";

// DOM elements
const hotelDetails = document.getElementById("hotel-details");

// Get HotelId
const params = new URLSearchParams(window.location.search);

const hotelId = parseInt(params.get("hotelId"));

// Create Element function
const createHotelDetail = (object) => {
  // Containers
  const hotelBasicContainer = document.createElement("div");
  const hotelTitleContainer = document.createElement("div");
  const hotelAddressContainer = document.createElement("div");
  const amenitiesContainer = document.createElement("div");
  const descriptionContainer = document.createElement("div");
  const buttonContainer = document.createElement("div");
  const mainInfoContainer = document.createElement("div");
  const basicInfoContainer = document.createElement("div");
  const hotelImg = document.createElement("img");
  const hotelNamePara = document.createElement("h3");
  const hotelAddressPara = document.createElement("p");
  const hotelRating = document.createElement("p");
  const hotelStars = document.createElement("i");
  const hotelPrice = document.createElement("p");
  const hotelAmenitiesHeader = document.createElement("h4");
  const hotelAmenitiesPara = document.createElement("p");
  const hotelDescriptionHeader = document.createElement("h4");
  const hotelDescription = document.createElement("p");
  const bookNowBtn = document.createElement("button");

  hotelImg.src = object.src;
  hotelImg.alt = object.alt;
  console.log(object.hotelName);
  hotelNamePara.textContent = object.hotelName;
  hotelAddressPara.textContent = object.address;
  hotelRating.textContent = object.rating;
  hotelPrice.textContent = object.price;

  // Classes
  hotelImg.classList.add("hotel-img");
  hotelStars.classList.add("fa-solid", "fa-star");
  hotelBasicContainer.classList.add("hotel-main-container");
  hotelTitleContainer.classList.add("hotel-title-container");
  hotelRating.classList.add("card-rating");
  hotelAddressContainer.classList.add("hotel-address");
  buttonContainer.classList.add("button-container");
  amenitiesContainer.classList.add("amenities-container");
  descriptionContainer.classList.add("description-container");
  basicInfoContainer.classList.add("basic-info-container");
  mainInfoContainer.classList.add("main-info-container");

  hotelAmenitiesHeader.textContent = "Amenities";
  hotelAmenitiesPara.textContent = object.amenities;

  hotelDescriptionHeader.textContent = "Description";
  hotelDescription.textContent = object.description;

  bookNowBtn.textContent = "Book Now";

  bookNowBtn.setAttribute("id", "book-now-btn");

  // Appends
  hotelRating.prepend(hotelStars);
  hotelTitleContainer.append(hotelNamePara, hotelRating);
  hotelAddressContainer.append(hotelAddressPara, hotelPrice);
  mainInfoContainer.append(
    hotelImg,
    hotelTitleContainer,
    hotelAddressContainer,
    bookNowBtn
  );
  amenitiesContainer.append(hotelAmenitiesHeader, hotelAmenitiesPara);
  descriptionContainer.append(hotelDescriptionHeader, hotelDescription);
  basicInfoContainer.append(amenitiesContainer, descriptionContainer);
  hotelBasicContainer.append(mainInfoContainer, basicInfoContainer);
  hotelDetails.append(hotelBasicContainer);

  // Event Listener
  bookNowBtn.addEventListener("click", () => {
    window.location.href = `form-page.html?hotelId=${object.id}`;
  });
};

// Loop through array
const selectedHotel = hotels.find((hotel) => hotel.id === hotelId);

createHotelDetail(selectedHotel);
