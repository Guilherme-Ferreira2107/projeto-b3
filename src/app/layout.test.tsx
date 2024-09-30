import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import configureMockStore from "redux-mock-store";
import { render, waitFor } from "@testing-library/react";
import { PersistGate } from "redux-persist/integration/react";

import Layout from "./layout";

describe("Layout Component", () => {
  const mockStore = configureMockStore();

  it("renders layout with children", async () => {
    const store = mockStore({ user: {} });
    const persistor = persistStore(store);

    const { container } = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <div>Content</div>
          </Layout>
        </PersistGate>
      </Provider>
    );
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});
