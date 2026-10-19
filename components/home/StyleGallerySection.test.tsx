// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import StyleGallerySection from "./StyleGallerySection";

afterEach(cleanup);

const shownTitles = () => screen.getAllByRole("img").map((img) => img.getAttribute("alt"));

describe("StyleGallerySection", () => {
  it("shows every style by default", () => {
    render(<StyleGallerySection />);
    expect(shownTitles()).toHaveLength(6);
  });

  it.each([
    ["Anime HD", "Cyberpunk Blade Girl in Neon Rain"],
    ["Comic Ink", "Vintage Detective In Shadowed Alley"],
    ["Watercolor", "Dreamy Whispering Forest Spirit"],
  ])("filters to %s", async (filter, title) => {
    render(<StyleGallerySection />);
    await userEvent.click(screen.getByRole("button", { name: filter }));
    expect(shownTitles()).toEqual([title]);
  });

  it("returns to every style after 'All Styles'", async () => {
    render(<StyleGallerySection />);
    await userEvent.click(screen.getByRole("button", { name: "Claymation" }));
    await userEvent.click(screen.getByRole("button", { name: "All Styles" }));
    expect(shownTitles()).toHaveLength(6);
  });

  it("has a filter button that matches at least one card for every style", async () => {
    render(<StyleGallerySection />);
    const filters = ["3D Pixar", "Anime HD", "Comic Ink", "Claymation", "Cyberpunk", "Watercolor"];
    for (const filter of filters) {
      await userEvent.click(screen.getByRole("button", { name: filter }));
      expect(shownTitles().length, `${filter} shows no cards`).toBeGreaterThan(0);
    }
  });
});
