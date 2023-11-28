import { Card } from "@components/cards";
import * as Score from "./score.ts";

export const compare = (
  myHand: Array<Card>,
  dealer: Array<Card>,
): "win" | "lose" | "draw" => {
  const myScore = Score.count(myHand);
  const dealerScore = Score.count(dealer);

  switch (true) {
    case Score.isNormal(myScore) && Score.isNormal(dealerScore): {
      const myDiff = 21 - (myScore as Score.Normal).value;
      const theirDiff = 21 - (dealerScore as Score.Normal).value;
      return myDiff < theirDiff ? "win" : myDiff > theirDiff ? "lose" : "draw";
    }
    case Score.isBusted(myScore):
      return "lose";
    case Score.isBusted(dealerScore):
      return "win";
    case Score.isBlackjack(myScore):
      return "win";
    case Score.isBlackjack(dealerScore):
      return "lose";
    default:
      return "draw";
  }
};
