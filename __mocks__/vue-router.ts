
import { vi } from "vitest";

export const useRouter = vi.fn(() => ({
  push: vi.fn(),
}));

export const useRoute = vi.fn(() => ({
  path: "",
  meta: {
    menuItem: "one menu item",
  },
}));
