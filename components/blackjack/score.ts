import { Card } from "@components/cards";
import { cond } from "pfp-ts";

export type Blackjack = { kind: "blackjack" };
export const Blackjack: Blackjack = { kind: "blackjack" };
export type Busted = { kind: "busted" };
export const Busted: Busted = { kind: "busted" };
export type Normal = { kind: "normal"; value: number };
export const Normal = (value: number): Normal => ({ kind: "normal", value });

export type Score = Blackjack | Busted | Normal;

export const isBlackjack = (s: Score): s is Blackjack => s.kind === "blackjack";
export const isBusted = (s: Score): s is Busted => s.kind === "busted";
export const isNormal = (s: Score): s is Normal =>
  !isBlackjack(s) && !isBusted(s);

export const count = (hand: Array<Card>): Score => {
  const score = hand.reduce((total, card) => {
    const getCardValue = cond<number, number>(
      // prettier-ignore
      [
        [(rank) => rank <= 10, (rank) => rank],
        [(rank) => rank < 14,  () => 10],
        [() => total < 10,     () => 11],
        [() => true,           () => 1],
      ],
    );
    const value = getCardValue(card.rank);
    return total + value;
  }, 0);

  return score === 21 && hand.length === 2
    ? Blackjack
    : score > 21
    ? Busted
    : Normal(score);
};

export const showScore = (s: Score): string =>
  s.kind === "blackjack"
    ? "Blackjack!"
    : s.kind === "busted"
    ? "Busted!"
    : String(s.value);
