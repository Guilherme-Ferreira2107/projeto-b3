import { THEME_MOCKS } from "@/__mocks__";
import { render, screen } from "@testing-library/react";

import { LinkComponent } from "./Link";

jest.mock("@mui/material", () => {
  const originalModule = jest.requireActual("@mui/material");
  return {
    ...originalModule,
    useTheme: jest.fn(() => THEME_MOCKS),
    ThemeProvider: ({ children }: never) => <div>{children}</div>,
  };
});

describe("LinkComponent", () => {
  it("should apply the default color from the theme if no color is provided", () => {
    render(<LinkComponent href="/home">Go Home</LinkComponent>);

    const linkElement = screen.getByText("Go Home");
    expect(linkElement).toHaveStyle(
      `color: ${THEME_MOCKS.palette.text.primary}`
    );
  });

  it("should apply a custom color when provided", () => {
    const customColor = THEME_MOCKS.palette.secondary.main;
    render(
      <LinkComponent href="/home" color={customColor}>
        Go Home
      </LinkComponent>
    );

    const linkElement = screen.getByText("Go Home");
    expect(linkElement).toHaveStyle(`color: ${customColor}`);
  });
});
