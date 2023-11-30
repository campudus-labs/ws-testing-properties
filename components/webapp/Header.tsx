import { sample } from "@components/array";
import React, { useMemo } from "react";

type GameState = "win" | "lose" | "draw" | "in-progress";

const winnings = ["Wow,", "What a match -", "So,"];
const losings = [
  "You fought, but",
  "Bad luck,",
  "Exciting, but",
  "Thanks for the effort, but",
  "Not only boring, also",
];

const toMessage = (state: GameState): string => {
  const hasWon = state === "win";
  const hasLost = state === "lose";
  const prefix = sample(
    hasWon ? winnings : hasLost ? losings : [...winnings, ...losings],
  );
  const suffix = hasWon ? "you won" : hasLost ? "you lost" : "it's a draw";
  return `${prefix} ${suffix}!`;
};

export const Header = ({ gameState }: { gameState: GameState }) => {
  const message = useMemo(
    () => (gameState === "in-progress" ? undefined : toMessage(gameState)),
    [gameState],
  );

  return (
    <header>
      <h1>{message ?? "Pick a move"}</h1>
    </header>
  );
};
