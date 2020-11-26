import { getMIRAnnualRewards } from "./calc"

test("MIR Annual rewards", () => {
  const Y1999 = new Date("1999-01-01").getTime()
  const Y2021 = new Date("2021-01-01").getTime()
  const Y2022 = new Date("2022-01-01").getTime()
  const Y2023 = new Date("2023-01-01").getTime()
  const Y2024 = new Date("2024-01-01").getTime()
  const Y2025 = new Date("2025-01-01").getTime()

  expect(getMIRAnnualRewards(Y1999)).toBe(3431250)
  expect(getMIRAnnualRewards(Y2021)).toBe(3431250)
  expect(getMIRAnnualRewards(Y2022)).toBe(1715625)
  expect(getMIRAnnualRewards(Y2023)).toBe(857813)
  expect(getMIRAnnualRewards(Y2024)).toBe(428906)
  expect(getMIRAnnualRewards(Y2025)).toBe(undefined)

  expect(getMIRAnnualRewards(Y1999, true)).toBe(10293750)
  expect(getMIRAnnualRewards(Y2021, true)).toBe(10293750)
  expect(getMIRAnnualRewards(Y2022, true)).toBe(5146875)
  expect(getMIRAnnualRewards(Y2023, true)).toBe(2573439)
  expect(getMIRAnnualRewards(Y2024, true)).toBe(1286718)
  expect(getMIRAnnualRewards(Y2025, true)).toBe(undefined)
})
