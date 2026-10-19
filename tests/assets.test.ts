import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Catches an image that was renamed or deleted from public/ while the code still points at it.
// The browser tests can't see every one: some are CSS backgrounds or only show after a click.
const root = join(__dirname, "..");

function sourceFiles(dir: string): string[] {
  return readdirSync(join(root, dir), { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && /\.(tsx?|css)$/.test(entry.name))
    .filter((entry) => !/\.test\.tsx?$/.test(entry.name))
    .map((entry) => join(entry.parentPath, entry.name));
}

const references = [...sourceFiles("app"), ...sourceFiles("components")].flatMap((file) =>
  [...readFileSync(file, "utf8").matchAll(/["'(]\/(images\/[^"')?#]+)/g)].map((match) => ({
    file: file.slice(root.length + 1),
    asset: match[1],
  }))
);

describe("public/ images", () => {
  it("finds the image references to check", () => {
    expect(references.length).toBeGreaterThan(0);
  });

  it("has a file for every /images/... path the code uses", () => {
    const missing = references.filter(({ asset }) => !existsSync(join(root, "public", asset)));
    expect(missing).toEqual([]);
  });
});
