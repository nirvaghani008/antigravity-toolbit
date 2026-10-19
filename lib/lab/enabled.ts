// The Lab is a practice area that copies Toolbit-style features so their tests can be
// tried here first. It is on in `npm run dev` and in tests, and off on the live site
// unless LAB_ENABLED=1 is set on the server.
export function isLabEnabled(): boolean {
  return process.env.NODE_ENV === "development" || process.env.LAB_ENABLED === "1";
}

export function labDisabledResponse() {
  return Response.json({ error: "Not found" }, { status: 404 });
}
