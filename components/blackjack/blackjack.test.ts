import { assertEquals } from "assert";
import fc from "fast-check";
import { Card, Suite, Rank } from "@components/cards";
import { shuffle } from "@components/array";

import { count as calcScore } from "./index.ts";

// Beim spielen hat sich herausgestellt, dass wohl die Reihenfolge der gezogenen
// Karten einen Einfluss auf das Ergebnis in Punkten hat... das sollte nicht so
// sein.

Deno.test(
  "Eigenschaft: Die Reihenfolge der gezogenen Karten hat keinen Einfluss auf die Wertung",
  () => {
    const ACE = 14;
    const rank = fc.integer({ min: 2, max: ACE });

    // Bei spielen mit Farbe könnte man auch die Farbe noch randomisieren
    const rankToCard = (rank: Rank) => Card(rank, Suite.clubs);
    fc.assert(
      fc.property(fc.array(rank), (ranks: Array<Rank>) => {
        const cards = ranks.map(rankToCard);
        assertEquals(calcScore(cards), calcScore(shuffle(cards)));
      }),
      // Wie erwartet führt das zu Fehlern. Hier hilft uns vielleicht, den Weg
      // dahin zu sehen
      { verbose: 2 },
      // Aha. Die Logik funktioniert immer, solange kein Ass dabei ist.
      // Scheinbar haben wir die Regel, dass man Asse immer zu seinem eigenen
      // Vorteil entweder als 1 oder 11 werten darf falsch umgesetzt.
      // Zeit für ein Ticket!
    );
  },
);
