//to ensure the DOM is loaded and ready as soon as the page is opened ==> utilized the "DOMContentLoaded"
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:8080/newBooking/latest"); //link to the query to get latest addition to the table

    const bookings = await response.json();

    if (!response.ok) {
      throw new Error(bookings.error.message);
    }

    const summary = document.getElementById("booking-summary");
    summary.innerHTML = ""; // Clear old content

    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Hotel: ${bookings.data.hotel_name}</h3>
        <p>Customer: ${bookings.data.customer_name}</p>
        <p>Check-in: ${bookings.data.check_in}</p>
        <p>Check-out: ${bookings.data.check_out}</p>
      `;
    summary.appendChild(div);
  } catch (error) {
    console.error("Booking confirmation failed:", error.message);
  }
});
