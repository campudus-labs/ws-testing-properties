import { nativeSort as sort } from "./index.ts";
import { assert, assertEquals } from "assert";
import fc from "fast-check";
import { frequencies } from "@components/array";

// Welche Eigenschaften erwartet wir von einem sortierten Array?

// Alle Array-Member sind sortiert
const isSorted = (ns: Array<number>) => {
  for (let i = 1; i < ns.length; i++) {
    if (ns[i] < ns[i - 1]) return false;
  }
  return true;
};

// Das sortierte Array hat die selbe Länge wie der unsortierte Input
const hasSameLength = (a: Array<number>, b: Array<number>) =>
  a.length === b.length;

// Im sortierten Array sind die selben Zahlen wie im unsortierten Input
// Oder auch: Jede Zahl kommt in beiden Arrays gleich oft vor
const assertHasSameMembers = (a: Array<number>, b: Array<number>) => {
  assertEquals(frequencies(a), frequencies(b));
};

// Testing by example

Deno.test("Ein Beispielarray ist sortiert", () => {
  const arr = [1, 3, 5, 3, 2, 9];
  const sorted = sort(arr);
  // Direkter Test:
  assertEquals([1, 2, 3, 3, 5, 9], sorted);

  // Mit Eigenschaften
  assert(isSorted(sorted));
  assert(hasSameLength(arr, sorted));
  assertHasSameMembers(arr, sorted);
});

// Schön und gut, aber wir können nur testen, was uns auch einfällt.
//
// Und überhaupt, warum sollen wir uns Beispiele selber überlegen? Mit unserem
// Beispiel was es sowieso unnötig, die Eigenschaften zu testen, weil wir die
// erwartete Lösung per Hand eingegeben haben.
//
// Testen wir doch mal auf die Eigenschaften, nicht auf das
// Implementierungsdetail "ein Beispiel":

Deno.test(
  "Eigenschaft: Sortierte Arrays haben die selbe Länge wie der unsortierte Input",
  () => {
    // Der Test-Runner von fast-check. Standardmäßig läuft er 100 randomisierte Test
    // inklusive Corner-Cases (leere Arrays, sehr kleine Arrays, sehr große
    // Arrays,...)
    fc.assert(
      // Builder für eine Testeigenschaft
      fc.property(
        // 1+ generierte Input-Werte
        fc.array(fc.integer()),
        // Die Testcondition, bekommt alle generierten Inputs als Parameter
        (arr: Array<number>) => {
          assert(hasSameLength(arr, sort(arr)));
        },
      ),
    );
  },
);

// Schaut doch gut aus!
Deno.test(
  "Eigenschaft: In sortierten Arrays sind die selben Elemente wie vorher",
  () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr: Array<number>) => {
        assertHasSameMembers(arr, sort(arr));
      }),
    );
  },
);

// Wait, what?
Deno.test("Eigenschaft: In sortierten Arrays sind die Zahlen sortiert", () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr: Array<number>) => {
      assert(isSorted(sort(arr)));
    }),
    // Eine Beispielausgabe:
    // { seed: -576908022, path: "1:2:4:4:6:4:4:4:4:4:5:4:4:4:4:4:10:6:4:4:5:5", endOnFailure: true }
    // Counterexample: [[2,1000000000]]
    // Shrunk 21 time(s)

    /* Ok, das kam unerwartet. Schauen wir uns mal an, wie fast-check dazu
     * gekommen ist. Kommentiere die nächste Zeile aus.
     */
    // { verbose: 2 },
  );
});

// Libs, die property-based testing machen haben "Shrinking"-Mechanismen
// eingebaut, mit denen sie versuchen, das kleinstmögliche Beispiel zu finden,
// für das ein Test fehlschlägt. (s.o.: "Shrunk n time(s)")
//
// Indem wir { verbose: 2 } eingeben protokolliert fast-check seinen Weg, auf
// dem es diesen kleinstmöglichen Fall konstruiert hat. Um einen fehlschlagenden
// Test trotz Randomisierung exakt wiederholen zu können wird auch der Seed, mit
// dem der Semi-Zufallsgenerator initialisiert wurde mitgeliefert.

// Nach etwas Kopf kratzen stellen wir fest, "Ah, JavaScript hat keine Ahnung,
// was es gerade sortiert und keine Typen, es castet einfach mal alles zu
// Strings und sortiert dann alphabetisch. Natürlich kommt 100000000 vor zwei im
// Alphabet. It's not a bug, it's a feature."
