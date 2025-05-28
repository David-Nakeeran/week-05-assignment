import { hotels } from "./hotelsArray.js";

// DOM elements
const form = document.querySelector("form");

const baseUrl = "http://localhost:8080";

const params = new URLSearchParams(window.location.search);

const hotelId = parseInt(params.get("hotelId"));

const selectedHotel = hotels.find((hotel) => hotel.id === hotelId);

document.getElementById("hotel-name").value = selectedHotel.hotelName;

const submitHandler = async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const formValues = Object.fromEntries(formData);

  await fetch(`${baseUrl}/newBooking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  form.reset();
};
form.addEventListener("submit", submitHandler);
