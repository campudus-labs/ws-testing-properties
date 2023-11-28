import { Card, drawCardFromInfiniteTalon } from "@components/cards";
import { Action, Hit, Stand } from "./actions.ts";
import * as Score from "./score.ts";

export const deal = (talon: Array<Card>, hand: Array<Card>): Action => {
  const score = Score.count(hand);
  return Score.isNormal(score) && score.value < 17
    ? Hit([...hand, drawCardFromInfiniteTalon(talon)])
    : Stand(hand);
};
