import test from "tape";
import { z } from "zod";

// https://github.com/colinhacks/zod/issues/653
const trimString = (u) => (typeof u === "string" ? u.trim() : u);

const schema = z.object({
  name: z.preprocess(trimString, z.string().min(1)),
  detail: z
    .record(z.string().min(1), z.preprocess(trimString, z.string().min(1)))
    .array()
});

const validData = {
  name: "name",
  detail: [{ detail1: "detail1" }]
};
const emptyValue = {
  name: "name",
  detail: [{ detail1: "" }]
};
const blankSpace = {
  name: " ",
  detail: [{ detail1: " " }]
};

test("valid", (t) => {
  const validation = schema.safeParse(validData);
  t.true(validation.success);
  t.end();
  console.log(validation.error?.format());
});

test("invalid empty value", (t) => {
  const validation = schema.safeParse(emptyValue);
  t.true(validation.success);
  t.end();
  console.log(validation.error?.format());
});

test("invalid blank space", (t) => {
  const validation = schema.safeParse(blankSpace);
  t.true(validation.success);
  t.end();
  console.log(validation.error?.format());
});
