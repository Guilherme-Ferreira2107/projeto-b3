import { Box } from "@mui/material";
import { render, screen } from "@testing-library/react";

import { Modal } from "./Modal";

describe("Modal Component", () => {
  it("should render children content when open is true", () => {
    render(
      <Modal open={true} onClose={jest.fn()}>
        <Box>Modal Content</Box>
      </Modal>
    );

    const modalContent = screen.getByText("Modal Content");
    expect(modalContent).toBeInTheDocument();
  });

  it("should not render children content when open is false", () => {
    render(
      <Modal open={false} onClose={jest.fn()}>
        <Box>Modal Content</Box>
      </Modal>
    );

    const modalContent = screen.queryByText("Modal Content");
    expect(modalContent).not.toBeInTheDocument();
  });
});
