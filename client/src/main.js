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
  const hotelLeftContainer = document.createElement("div");
  const hotelRightContainer = document.createElement("div");

  const hotelImg = document.createElement("img");
  const hotelNamePara = document.createElement("p");
  const hotelAddressPara = document.createElement("p");
  const hotelRating = document.createElement("p");
  const hotelPrice = document.createElement("p");
  const hotelAmenitiesHeader = document.createElement("h3");
  const hotelAmenitiesPara = document.createElement("p");
  const hotelDescriptionHeader = document.createElement("h3");
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

  hotelAmenitiesHeader.textContent = "Amenities";
  hotelAmenitiesPara.textContent = object.amenities;

  hotelDescriptionHeader.textContent = "Description";
  hotelDescription.textContent = object.description;

  bookNowBtn.textContent = "Book Now";

  bookNowBtn.setAttribute("id", "book-now-btn");

  // Appends
  hotelLeftContainer.append(hotelNamePara, hotelAddressPara);
  hotelRightContainer.append(hotelRating, hotelPrice);

  hotelBasicContainer.append(
    hotelImg,
    hotelLeftContainer,
    hotelRightContainer,
    hotelAmenitiesHeader,
    hotelAmenitiesPara,
    hotelDescriptionHeader,
    hotelDescription,
    bookNowBtn
  );
  hotelDetails.append(hotelBasicContainer);

  // Event Listener
  bookNowBtn.addEventListener("click", () => {
    window.location.href = `form-page.html?hotelId=${object.id}`;
  });
};

// Loop through array
const selectedHotel = hotels.find((hotel) => hotel.id === hotelId);

createHotelDetail(selectedHotel);
