// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import ContactPage from "./page";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function mockApi(status: number, body: unknown) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    json: async () => body,
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function fillForm(fields: { name?: string; email?: string; message?: string }) {
  const user = userEvent.setup();
  if (fields.name) await user.type(screen.getByLabelText("Your Name"), fields.name);
  if (fields.email) await user.type(screen.getByLabelText("Email Address"), fields.email);
  if (fields.message) await user.type(screen.getByLabelText("Your Message"), fields.message);
  await user.click(screen.getByRole("button", { name: "Send Message" }));
}

const valid = {
  name: "Maya Lin",
  email: "maya@studio.com",
  message: "Do you offer an education discount?",
};

describe("Contact page form", () => {
  it("shows the message-length error and sends nothing when the message is too short", async () => {
    const fetchMock = mockApi(200, { success: true });
    render(<ContactPage />);
    await fillForm({ ...valid, message: "Hi there" });

    expect(screen.getByText("Message must be at least 10 characters long")).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends the form to /api/contact and shows the thank-you panel", async () => {
    const fetchMock = mockApi(200, { success: true });
    render(<ContactPage />);
    await fillForm(valid);

    expect(await screen.findByText("Message Received!")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(JSON.parse(init.body)).toEqual({ ...valid, subject: "General Inquiry" });
  });

  it("shows the server's error and keeps what the user typed", async () => {
    mockApi(400, { error: "Please enter a valid email address" });
    render(<ContactPage />);
    await fillForm(valid);

    expect(await screen.findByText("Please enter a valid email address")).toBeTruthy();
    expect(screen.queryByText("Message Received!")).toBeNull();
    expect((screen.getByLabelText("Your Name") as HTMLInputElement).value).toBe(valid.name);
  });

  it("lets the user send another message after a success", async () => {
    mockApi(200, { success: true });
    render(<ContactPage />);
    await fillForm(valid);
    await userEvent.click(await screen.findByRole("button", { name: "Send Another Message" }));

    expect((screen.getByLabelText("Your Name") as HTMLInputElement).value).toBe("");
  });
});
