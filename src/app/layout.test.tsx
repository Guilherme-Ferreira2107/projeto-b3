import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./layout";
import { store, persistor } from "@/store";

jest.mock("@/components", () => ({
  Loading: () => <div data-testid="loading">Loading...</div>,
}));

describe("Layout Component", () => {
  it("renders layout with children", () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <div>Content</div>
          </Layout>
        </PersistGate>
      </Provider>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders ToastContainer", () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <div>Content</div>
          </Layout>
        </PersistGate>
      </Provider>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(document.querySelector(".Toastify")).toBeInTheDocument();
  });

  it("renders Suspense fallback correctly", () => {
    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <div>Content</div>
          </Layout>
        </PersistGate>
      </Provider>
    );

    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });
});
