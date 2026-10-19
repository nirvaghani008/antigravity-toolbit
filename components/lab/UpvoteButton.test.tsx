// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import UpvoteButton from "./UpvoteButton";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const count = () => screen.getByTestId("upvote-count").textContent;

describe("UpvoteButton", () => {
  it("adds the vote right away, then shows the server's count", async () => {
    let answer!: (value: unknown) => void;
    vi.stubGlobal("fetch", vi.fn(() => new Promise((resolve) => (answer = resolve))));
    render(<UpvoteButton slug="inkpal" toolName="InkPal" initialCount={214} initialVoted={false} />);

    await userEvent.click(screen.getByRole("button", { name: "Upvote InkPal" }));
    expect(count()).toBe("215"); // before the server has answered

    // Someone else voted meanwhile, so the server's number is higher.
    answer({ ok: true, json: async () => ({ count: 217 }) });
    await vi.waitFor(() => expect(count()).toBe("217"));
    expect(screen.getByRole("button", { name: "You upvoted InkPal" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("takes the vote back and explains when the server refuses it", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }));
    render(<UpvoteButton slug="inkpal" toolName="InkPal" initialCount={214} initialVoted={false} />);

    await userEvent.click(screen.getByRole("button", { name: "Upvote InkPal" }));

    expect((await screen.findByRole("alert")).textContent).toContain("wasn't saved");
    expect(count()).toBe("214");
    expect(screen.getByRole("button", { name: "Upvote InkPal" })).toHaveProperty("disabled", false);
  });

  it("can't be clicked again by someone who already voted", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<UpvoteButton slug="inkpal" toolName="InkPal" initialCount={215} initialVoted />);

    const button = screen.getByRole("button", { name: "You upvoted InkPal" });
    expect(button).toHaveProperty("disabled", true);
    await userEvent.click(button);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
