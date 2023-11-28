import React from "react";
import { Action, Score, showAction, showScore } from "@components/blackjack";
import { Card, showCard } from "@components/cards";
import { PlayingCard } from "./PlayingCard.tsx";

const row = { display: "flex", flexDirection: "row" } as any;
const column = { display: "flex", flexDirection: "column" } as any;

export const Table = ({
  player,
  dealer,
  score,
}: {
  player: Action;
  dealer: Action;
  score: { player: Score; dealer: Score };
}) => {
  return (
    <section style={row}>
      <Column
        action={showAction("You", player)}
        score={showScore(score.player)}
        cards={player.hand}
      />
      <Column
        action={showAction("Dealer", player)}
        score={showScore(score.dealer)}
        cards={dealer.hand}
      />
    </section>
  );
};

const Column = ({
  action,
  cards,
  score,
}: {
  action: string;
  score: string;
  cards: Array<Card>;
}) => {
  const width = 500;
  return (
    <div style={{ ...column, width: `${width}px` }}>
      <h2>{action}</h2>
      <h3>{score}</h3>
      <div style={{ ...row, position: "relative", height: "400px" }}>
        {cards.map((card, idx) => (
          <PlayingCard
            card={card}
            key={showCard(card) + String(idx)}
            dx={idx}
          />
        ))}
      </div>
    </div>
  );
};
