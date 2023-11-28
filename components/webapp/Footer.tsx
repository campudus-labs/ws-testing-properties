import React from "react";
export const Footer = ({
  onHit,
  onStand,
  onReset,
}: {
  hasMoves: boolean;
  onHit?: () => void;
  onStand?: () => void;
  onReset?: () => void;
}) => {
  return (
    <footer>
      {actionButton("Hit", onHit)}
      {actionButton("Stand", onStand)}
      {actionButton("New game", onReset)}
    </footer>
  );
};

const actionButton = (title: string, action?: () => void) =>
  action ? <button onClick={action}>{title}</button> : null;
