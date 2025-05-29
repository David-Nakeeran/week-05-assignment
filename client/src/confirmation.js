//to ensure the DOM is loaded and ready as soon as the page is opened ==> utilized the "DOMContentLoaded"
import { hotels } from "./hotelsArray.js";
const params = new URLSearchParams(window.location.search);

const hotelId = parseInt(params.get("hotelId"));

const selectedHotel = hotels.find((hotel) => hotel.id === hotelId);

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("https://week-05-assignment-server.onrender.com/newBooking/latest"); //link to the query to get latest addition to the table

    const bookings = await response.json();

    if (!response.ok) {
      throw new Error(bookings.error.message);
    }

    //converting the check_in date format to english so it's readable on the confirmation page

    const checkInDate = new Date(bookings.data.check_in).toLocaleDateString(
      "en-GB",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    //converting the check_out date format to english so it's readable on the confirmation page

    const checkOutDate = new Date(bookings.data.check_out).toLocaleDateString(
      "en-GB",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    const summary = document.getElementById("booking-summary");
    summary.innerHTML = ""; // Clear old content

    const div = document.createElement("div");
    div.innerHTML = `
        <p class="confirmation-para">Your booking summary:</p>
        `;

    const hotelDetails = document.createElement("div");
    hotelDetails.className = "hotelDetails";
    hotelDetails.innerHTML = `
      <h3>${bookings.data.hotel_name}</h3>
        <p>${selectedHotel.address}</p>`;

    const nameDateDetails = document.createElement("div");
    nameDateDetails.className = "nameDateDetails";
    nameDateDetails.innerHTML = `
        <p><strong>Customer:</strong> ${bookings.data.customer_name}</p>
        <p><strong>Check-in:</strong> ${checkInDate}</p>
        <p><strong>Check-out:</strong> ${checkOutDate}</p>
        
      `;
    const notes = document.createElement("div");
    notes.className = "notes";
    notes.innerHTML = `
      <p><strong>Notes:</strong> ${bookings.data.booking_notes}</p>`;

    summary.appendChild(div);
    summary.appendChild(hotelDetails);
    summary.appendChild(nameDateDetails);
    summary.appendChild(notes);
  } catch (error) {
    console.error("Booking confirmation failed:", error.message);
  }
});
