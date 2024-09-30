import { jest } from "@jest/globals";
import "@testing-library/jest-dom";

global.fetch = jest.fn().mockImplementation(() => ({
  json: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
  usePathname: jest.fn(),
  useServerInsertedHTML: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));
