import React from "react";
import {
  Hit,
  count as countScore,
  isNormal,
  isHit,
  compare,
  deal,
  Action,
  Stand,
} from "@components/blackjack";
import * as Cards from "@components/cards";
import { useMemo, useState } from "react";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import { Table } from "./Table.tsx";

type Hand = Array<Cards.Card>;

export const Game = () => {
  const talon: Array<Cards.Card> = useMemo(() => Cards.makeTalon(), []);
  const hit = (hand: Hand) =>
    Hit([...hand, Cards.drawCardFromInfiniteTalon(talon)]);
  const [player, setPlayer] = useState<Action>(hit([]));
  const [dealer, setDealer] = useState<Action>(hit([]));

  const scores = {
    player: countScore(player.hand),
    dealer: countScore(dealer.hand),
  };

  const reset = () => {
    const nextPlayer = hit([]);
    const nextDealer = hit([]);
    setPlayer(nextPlayer);
    setDealer(nextDealer);
  };

  const playerCanHit =
    isNormal(scores.player) && scores.player.value < 21 && isHit(player);
  const dealerCanHit = isHit(dealer) && isNormal(scores.dealer); // Dealer will automatically stand
  const areMovesLeft = playerCanHit || dealerCanHit;

  const gameState = areMovesLeft
    ? "in-progress"
    : compare(player.hand, dealer.hand);

  console.log("hello");

  const handleMove = (kind: "hit" | "stand") => () => {
    const newPlayer = kind === "hit" ? hit(player.hand) : Stand(player.hand);
    const newDealer = isNormal(countScore(newPlayer.hand))
      ? deal(talon, dealer.hand)
      : Stand(dealer.hand);
    setPlayer(newPlayer);
    setDealer(newDealer);
  };

  return (
    <main>
      <Header gameState={gameState} />
      <section>
        <Table player={player} dealer={dealer} score={scores} />
      </section>
      <Footer
        hasMoves={areMovesLeft}
        onHit={playerCanHit ? handleMove("hit") : undefined}
        onStand={areMovesLeft ? handleMove("stand") : undefined}
        onReset={areMovesLeft ? undefined : reset}
      />
    </main>
  );
};
