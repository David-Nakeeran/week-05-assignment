import { hotels } from "./hotelsArray.js";

// DOM elements
const hotelBookingSummary = document.getElementById("hotel-booking-summary");
const form = document.querySelector("form");

const baseUrl = "https://week-05-assignment-server.onrender.com";

const params = new URLSearchParams(window.location.search);

const hotelId = parseInt(params.get("hotelId"));

const selectedHotel = hotels.find((hotel) => hotel.id === hotelId);

// Create elements for hotel-booking-summary
const createElements = (object) => {
  const div = document.createElement("div");
  const hotelName = document.createElement("h3");
  const hotelRating = document.createElement("p");
  const hotelAddress = document.createElement("p");
  const hotelStars = document.createElement("i");

  hotelName.textContent = object.hotelName;
  hotelRating.textContent = object.rating;
  hotelAddress.textContent = object.address;
  hotelStars.classList.add("fa-solid", "fa-star");
  hotelRating.classList.add("card-rating");
  div.classList.add("hotel-title");

  hotelRating.prepend(hotelStars);
  div.append(hotelName, hotelRating);
  hotelBookingSummary.append(div, hotelAddress);
};

document.getElementById("hotel-name").value = selectedHotel.hotelName;

const submitHandler = async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const formValues = Object.fromEntries(formData);

  try {
    const response = await fetch(`${baseUrl}/newBooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    form.reset();

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error.message);
    }

    window.location.href = `confirmation-page.html?hotelId=${hotelId}`;
  } catch (error) {
    console.error("Booking failed:", error.message);
  }
};

createElements(selectedHotel);

form.addEventListener("submit", submitHandler);
