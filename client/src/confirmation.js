//to ensure the DOM is loaded and ready as soon as the page is opened ==> utilized the "DOMContentLoaded"
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:8080/newBooking/latest"); //link to the query to get latest addition to the table

    const bookings = await response.json();

    if (!response.ok) {
      throw new Error(bookings.error.message);
    }


    //converting the check_in date format to english so it's readable on the confirmation page

    const checkInDate = new Date(bookings.data.check_in).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    //converting the check_out date format to english so it's readable on the confirmation page

    const checkOutDate = new Date(bookings.data.check_out).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const summary = document.getElementById("booking-summary");
    summary.innerHTML = ""; // Clear old content

    const div = document.createElement("div");
    div.innerHTML = `
        <p class="confirmation-para">Your booking summary:</p>
        <h3>Hotel: ${bookings.data.hotel_name}</h3>
        <p>${bookings.data.address}</p>
        <p>Customer: ${bookings.data.customer_name}</p>
        <p>Check-in: ${checkInDate}</p>
        <p>Check-out: ${checkOutDate}</p>
      `;
    summary.appendChild(div);
  } catch (error) {
    console.error("Booking confirmation failed:", error.message);
  }
});
