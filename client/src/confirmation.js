//to ensure the DOM is loaded and ready as soon as the page is opened ==> utilized the "DOMContentLoaded"
window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:8080/newBooking/latest"); //link to the query to get latest addition to the table 
    const bookings = await response.json();
  
    const summary = document.getElementById("booking-summary");
    summary.innerHTML = ""; // Clear old content
  
    
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>Hotel: ${bookings.hotel_name}</h3>
        <p>Customer: ${bookings.customer_name}</p>
        <p>Check-in: ${bookings.check_in}</p>
        <p>Check-out: ${bookings.check_out}</p>
      `;
      summary.appendChild(div);
    
  });
  
