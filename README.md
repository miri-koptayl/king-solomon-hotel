Hotel Management System – Frontend
A web-based application for hotel room booking and management. This project provides both a client-facing interface for guests and an administrative interface for hotel staff. It offers a streamlined and multilingual experience, with a clean design and efficient user flow.

Project Overview
The system was developed to enable hotel customers to make reservations easily and to allow hotel staff to manage room availability and bookings efficiently. The main features include:

Displaying available rooms with descriptions, pricing, and images.
Adding rooms to a booking cart.
Completing a reservation with a credit card payment form.
Sending a confirmation email upon successful booking.
Admin interface for viewing and managing incoming reservations.
Full support for multiple languages (Hebrew and English) using react-i18next.
Main Technologies Used
React – Component-based front-end framework.
Redux – Global state management (booking cart).
Material UI (MUI) – Pre-styled UI components and layout system.
EmailJS – For sending reservation confirmations via email.
React Router – Routing and navigation.
Node.js + MongoDB – Back-end server and database for managing hotel data and bookings.
Project Structure
hotel/ ├── src/ │ ├── components/ # Reusable UI components │ ├── pages/ # Main screens/pages │ ├── api/ # API service handlers │ ├── features/ # Redux slices │ └── App.js # Main application component

Local Installation & Setup
Prerequisites
Node.js and npm installed
MongoDB instance (local or cloud)
Steps
Clone the repository: git clone https://github.com/miri-koptayl/hotel---front.git cd hotel---front Install client dependencies:
npm install Run the front-end (React) development server:

npm start Start the back-end server:

Navigate to the server folder (e.g., hotel-server) and run:

npm install npm start Make sure MongoDB is running and configured in the server .env file or config.

Additional Notes Project supports full RTL (Right-to-Left) layout for Hebrew.

Language preference is stored in local storage and persists across sessions.

Responsive design ensures a good experience across desktop and mobile devices.

Booking confirmation is sent via email using a preconfigured EmailJS template.

For further details or contributions, please contact the project maintainer through GitHub.
