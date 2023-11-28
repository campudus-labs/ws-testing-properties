import { assertEquals } from "assert";
import * as Cards from "./index.ts";

Deno.test("should create a full talon of cards", () => {
  const talon = Cards.makeTalon();
  console.log(talon.map(Cards.showCard));
  assertEquals(talon.length, 52);
});
