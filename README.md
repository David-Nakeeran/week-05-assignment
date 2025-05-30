## Week-05-Assignment

## Project description:

A simple web app that lets users browse hotels in Norwich and make a booking. Select a hotel, fill out a form, and view a confirmation of your reservation.

Project name: Norstay

Team members: Elena, David, Val

## Live Demo

[Norstay on Render](https://week-05-assignment-client.onrender.com/)

## How to run application

This project uses Supabase for database storage.

1. Create the database table

Create a table called bookings using the following SQL schema:

```
CREATE TABLE bookings (
  id bigint generated always as identity primary key,
  hotel_name VARCHAR(255),
  customer_name VARCHAR(255),
  customer_phone NUMERIC,
  customer_email VARCHAR(255),
  check_in DATE,
  check_out DATE,
  booking_notes VARCHAR(1000)
);
```

2. Clone Repo

```
git clone git@github.com:your-usernam/week-05-assignment.git
cd week-05-assignment
```

3. Set up the Server (Express)
   Navigate to the server directory and install dependencies

```
cd server
npm install
```

Create an .env file in the server folder and add your Supabase connection string:

```
DATABASE_URL=supabase_connection_string
```

Run server:

```
npm run dev
```

4. Set up the Client (Vite)

In a new terminal window, navigate to the client directory:

```
cd client
npm install
npm run dev
```

## User Stories

1. As a user, I want to see a list of available hotels,
   so that I can choose one that fits my preferences.
2. As a user, I want to click on a hotel to view more details,
   so that I can learn about its rooms, amenities, and location before booking.
3. As a user, I want to fill out a booking form with my information and selected dates,
   so that I can make a reservation for the hotel I’ve chosen.
4. As a user, I want to see a confirmation page after submitting the booking form,
   so that I know my booking was received and what details I entered.

## Stretch User Stories (Not Yet Implemented)

5. As a user, I want to view a list of my previous bookings,
   so that I can review where and when I’ve booked in the past.
6. As a user, I want to be able to edit my booking if I make a mistake,
   so that I can change the details without having to resubmit a new booking.
7. As a user, I want to be able to cancel a booking,
   so that I can free up the room if my plans change.

## Wireframe:

## Reflections:

We successfully met all MVP requirements. However, we were unable to implement stretch goals due to time constraints.

Working collaboratively introduced challenges especially when working on shared files, which often led to merge conflicts. Coordinating pull requests and branches helped us manage this better.

## References:

Supabase documentation
Vite documentation
Express.js documentation
MDN Web Docs
