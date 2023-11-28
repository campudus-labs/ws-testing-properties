import { sample } from "@components/array";

export const Suite = {
  clubs: "♣",
  diamonds: "♦",
  hearts: "♥",
  spades: "♠",
} as const;
export type Suite = (typeof Suite)[keyof typeof Suite];

const SpecialRank: Record<number, string> = {
  11: "J",
  12: "Q",
  13: "K",
  14: "A",
};
export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
export const isRank = (n: number): n is Rank => 2 <= n && n <= 14;
export const showRank = (r: Rank): string =>
  r <= 10 ? String(r) : SpecialRank[r as number];

export const showCard = (card: Card): string =>
  `${showRank(card.rank)}${card.suite}`;

export type Card = {
  rank: Rank;
  suite: Suite;
};
export const Card = (rank: Rank, suite: Suite): Card => ({ rank, suite });

export const makeTalon = () => {
  const talon: Array<Card> = [];
  for (const suite of Object.values(Suite))
    for (let rank = 2; rank <= 14; rank++)
      if (isRank(rank)) talon.push(Card(rank, suite));
  return talon;
};

export const drawCardFromInfiniteTalon = (talon: Array<Card>): Card =>
  sample(talon)!;
