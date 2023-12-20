import { reverse } from "./reverse.ts";
import { assertEquals } from "assert";
import fc from "fast-check";

// Example based test

Deno.test("Simple, example based test", () => {
  assertEquals("olleh", reverse("hello"));
});

Deno.test("Edge case test", () => {
  assertEquals("", reverse(""));
});
