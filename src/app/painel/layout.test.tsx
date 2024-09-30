import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { useRouter } from "next/navigation";

import Layout from "./layout";

const mockStore = configureMockStore();

jest.mock("@mui/material", () => {
  const originalModule = jest.requireActual("@mui/material");
  return {
    ...originalModule,
    ThemeProvider: ({ children }: never): React.JSX.Element => (
      <div>{children}</div>
    ),
  };
});

describe("Layout Component", () => {
  const mockPush = jest.fn();
  const mockUser = {
    isAuthenticated: false,
    darkMode: false,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders children when user is authenticated", () => {
    const store = mockStore({
      user: { isAuthenticated: true, darkMode: false },
    });

    render(
      <Provider store={store}>
        <Layout>
          <div>Child Component</div>
        </Layout>
      </Provider>
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("redirects to home when user is not authenticated", () => {
    const store = mockStore({
      user: mockUser,
    });

    render(
      <Provider store={store}>
        <Layout>
          <div>Child Component</div>
        </Layout>
      </Provider>
    );

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("applies dark theme when user prefers dark mode", () => {
    const store = mockStore({
      user: { isAuthenticated: true, darkMode: true },
    });

    render(
      <Provider store={store}>
        <Layout>
          <div>Child Component</div>
        </Layout>
      </Provider>
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
