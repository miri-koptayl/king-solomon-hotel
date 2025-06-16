Hotel Management System – Frontend
A web-based application designed for hotel room booking and management. This project delivers both a client-facing interface for guests and an administrative interface for hotel staff. It provides a streamlined, multilingual experience with a clean design and efficient user workflow.

Project Overview
This system facilitates easy room reservations for hotel customers while enabling hotel staff to manage room availability and bookings effectively. Key features include:

Display of available rooms with detailed descriptions, pricing, and images.

Ability for guests to add rooms to a booking cart.

Completion of reservations with a secure credit card payment form.

Automated confirmation email sent upon successful booking.

Administrative interface for monitoring and managing incoming reservations.

Full multilingual support (Hebrew and English) implemented via react-i18next.

Main Technologies Used
React – Component-based frontend framework.

Redux – Global state management for the booking cart.

Material UI (MUI) – Pre-styled UI components and layout system.

EmailJS – Sending reservation confirmation emails.

React Router – Routing and navigation.

Node.js & MongoDB – Backend server and database for managing hotel data and bookings.

Project Structure

hotel/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main screens/pages
│   ├── api/              # API service handlers
│   ├── features/         # Redux slices
│   └── App.js            # Main application component
Local Installation & Setup
Prerequisites
Node.js and npm installed

MongoDB instance (local or cloud)

Steps
Clone the repository:


git clone https://github.com/miri-koptayl/hotel---front.git
cd hotel---front
Install client dependencies:


npm install
Run the frontend development server:


npm start
Start the backend server:

Navigate to the backend server directory (e.g., hotel-server) and run:


npm install
npm start
Ensure MongoDB is running and properly configured in the backend .env or configuration files.

Additional Notes
The project fully supports RTL (Right-to-Left) layout for Hebrew.

Language preference is saved in local storage and persists across user sessions.

The design is responsive, providing a seamless experience on both desktop and mobile devices.

Booking confirmations are sent automatically via EmailJS using a preconfigured email template.

