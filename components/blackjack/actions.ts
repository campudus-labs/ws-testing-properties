import { Card } from "@components/cards";

export type Hit = { kind: "hit"; hand: Array<Card> };
export const Hit = (hand: Array<Card>): Hit => ({ kind: "hit", hand });
export type Stand = { kind: "stand"; hand: Array<Card> };
export const Stand = (hand: Array<Card>): Stand => ({ kind: "stand", hand });

export type Action = Hit | Stand;
export const isHit = (a: Action): a is Hit => a.kind === "hit";
export const isStand = (a: Action): a is Stand => a.kind === "stand";

export const showAction = (prefix: string, action: Action) =>
  action.kind === "hit" ? `${prefix} draws a card.` : `${prefix} stands.`;
