import React from "react";
import { Card, Suite, showCard } from "@components/cards";

export const PlayingCard = ({ card, dx }: { card: Card; dx: number }) => {
  const label = showCard(card);
  const color =
    card.suite === Suite.diamonds || card.suite === Suite.hearts
      ? "red"
      : "black";
  return (
    <div style={{ position: "absolute", left: `${dx * 40}px` }}>
      <div
        style={{
          position: "relative",
          width: "220px",
          height: "330px",
          padding: "20px",
          border: "1px solid black",
          borderRadius: "10px",
          fontSize: "32px",
          color,
          background: "white",
        }}
      >
        <span style={{ position: "absolute", top: 0, left: 0 }}>{label}</span>
        <img
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          src="https://www.campudus.com/images/CampudusLogo/CampudusLogo.png"
        />
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            transform: "rotate(180deg)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
