// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import PricingSection from "./PricingSection";

afterEach(cleanup);

// Prices and billing notes appear in card order: Free, Creator Pro, Studio.
const prices = () => screen.getAllByText(/^\$\d+$/).map((el) => el.textContent);
const billingNotes = () =>
  screen.getAllByText(/^(forever|Billed monthly|Billed annually .*)$/).map((el) => el.textContent);

describe("PricingSection", () => {
  it("starts on annual billing with each plan's own yearly total", () => {
    render(<PricingSection />);
    expect(prices()).toEqual(["$0", "$14", "$44"]);
    expect(billingNotes()).toEqual([
      "forever",
      "Billed annually ($168/year)",
      "Billed annually ($528/year)",
    ]);
  });

  it("switches to monthly prices and says they are billed monthly", async () => {
    render(<PricingSection />);
    await userEvent.click(screen.getByRole("button", { name: "Monthly Billing" }));
    expect(prices()).toEqual(["$0", "$19", "$59"]);
    expect(billingNotes()).toEqual(["forever", "Billed monthly", "Billed monthly"]);
  });

  it("switches back to annual prices", async () => {
    render(<PricingSection />);
    await userEvent.click(screen.getByRole("button", { name: "Monthly Billing" }));
    await userEvent.click(screen.getByRole("button", { name: /Annual Billing/ }));
    expect(prices()).toEqual(["$0", "$14", "$44"]);
  });

  it("keeps the 'Save 25%' badge true for every paid plan", async () => {
    render(<PricingSection />);
    const dollars = () => prices().map((price) => Number(price?.slice(1)));
    const annual = dollars();
    await userEvent.click(screen.getByRole("button", { name: "Monthly Billing" }));
    const monthly = dollars();

    monthly.forEach((monthlyPrice, i) => {
      if (monthlyPrice === 0) return;
      // Whole-dollar prices, so allow rounding to the nearest dollar.
      expect(annual[i]).toBeLessThanOrEqual(Math.round(monthlyPrice * 0.75));
    });
  });
});
