// Email.jsx
import * as React from "react";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";

export const Email = ({ userName, EmailAddress, orderRooms }) => (
  <Html>
    <Head />
    <Body style={{ backgroundColor: "#f5f5f5", fontFamily: "Arial" }}>
      <Container style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
        <Heading>שלום {userName},</Heading>
        <Text>תודה שביצעת הזמנה! הנה פרטי ההזמנה שלך:</Text>
        <ul>
          {orderRooms.map((room, i) => (
            <li key={i}>
              חדר מספר: {room.num} – מחיר: {room.price} ₪
            </li>
          ))}
        </ul>
        <Text>המייל נשלח ל: {EmailAddress}</Text>
        <Text>נשמח לארח אותך בקרוב!</Text>
      </Container>
    </Body>
  </Html>
);
