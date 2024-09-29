import { describe, expect, it } from "vitest";
import { Varmegyle } from "./Varmegyle.tsx";
import { render, screen } from "@testing-library/react";

describe("test the game title", () => {
  it("renders the Varmegyle component", () => {
    render(<Varmegyle />);
    expect(screen.getByTestId("varmegyle")).toBeTypeOf("object");
  });
});
