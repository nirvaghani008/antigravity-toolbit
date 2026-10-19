// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SubmitToolForm from "./SubmitToolForm";

// The form calls router.push() for paid launches. Replace Next's router with a spy.
const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

function mockApi(status: number, body: unknown) {
  const fetchMock = vi.fn().mockResolvedValue({ ok: status < 300, status, json: async () => body });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function fillValidForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Tool name"), "Sketchify");
  await user.type(screen.getByLabelText("Website URL"), "sketchify.example");
  await user.type(screen.getByLabelText("Your email"), "maya@studio.com");
  await user.selectOptions(screen.getByLabelText("Category"), "Image");
  await user.type(screen.getByLabelText("Short description"), "Turns photos into pencil sketches.");
  return user;
}

beforeEach(() => {
  push.mockClear();
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("SubmitToolForm", () => {
  it("shows every error and sends nothing when submitted empty", async () => {
    const fetchMock = mockApi(201, {});
    render(<SubmitToolForm />);
    await userEvent.click(screen.getByRole("button", { name: "Submit for review" }));

    for (const message of [
      "Tool name must be at least 2 characters",
      "Website URL is required",
      "Email is required",
      "Choose a category",
      "Description must be at least 20 characters",
    ]) {
      expect(screen.getByText(message)).toBeTruthy();
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("changes the button to show the price when the paid launch is picked", async () => {
    render(<SubmitToolForm />);
    await userEvent.click(screen.getByRole("radio", { name: /Paid launch/ }));
    expect(screen.getByRole("button", { name: "Continue to payment ($49)" })).toBeTruthy();
  });

  it("shows the review-queue message after a free submission", async () => {
    const fetchMock = mockApi(201, { submissionId: "sub_123", checkoutUrl: null });
    render(<SubmitToolForm />);
    const user = await fillValidForm();
    await user.click(screen.getByRole("button", { name: "Submit for review" }));

    expect(await screen.findByText("Sketchify is in the review queue")).toBeTruthy();
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ plan: "free_listing", category: "Image" });
    expect(push).not.toHaveBeenCalled();
  });

  it("sends a paid launch to the checkout page", async () => {
    mockApi(201, { submissionId: "sub_123", checkoutUrl: "/lab/checkout/ord_abc" });
    render(<SubmitToolForm />);
    const user = await fillValidForm();
    await user.click(screen.getByRole("radio", { name: /Paid launch/ }));
    await user.click(screen.getByRole("button", { name: "Continue to payment ($49)" }));

    await vi.waitFor(() => expect(push).toHaveBeenCalledWith("/lab/checkout/ord_abc"));
  });

  it("shows the server's duplicate error next to the website field", async () => {
    mockApi(409, {
      error: "InkPal is already listed or waiting for review with this website.",
      errors: { url: "This website has already been submitted" },
    });
    render(<SubmitToolForm />);
    const user = await fillValidForm();
    await user.click(screen.getByRole("button", { name: "Submit for review" }));

    expect(await screen.findByRole("alert")).toHaveProperty("textContent", expect.stringContaining("InkPal"));
    expect(screen.getByText("This website has already been submitted")).toBeTruthy();
    expect((screen.getByLabelText("Tool name") as HTMLInputElement).value).toBe("Sketchify");
  });

  it("explains when the server can't be reached", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    render(<SubmitToolForm />);
    const user = await fillValidForm();
    await user.click(screen.getByRole("button", { name: "Submit for review" }));

    expect((await screen.findByRole("alert")).textContent).toMatch(/Couldn't reach the server/);
  });
});
