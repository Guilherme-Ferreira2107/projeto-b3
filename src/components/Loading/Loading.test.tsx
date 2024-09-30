import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";

describe("Loading Component", () => {
  it("should render a CircularProgress component", () => {
    render(<Loading />);

    const circularProgress = screen.getByRole("progressbar");
    expect(circularProgress).toBeInTheDocument();
  });

  it("should have the correct Box styling", () => {
    render(<Loading />);

    const boxElement = screen.getByRole("progressbar").closest("div");
    expect(boxElement).toHaveStyle("display: flex");
  });
});
