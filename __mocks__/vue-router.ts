
import { vi } from "vitest";

export const useRouter = vi.fn(() => ({
  push: vi.fn(),
}));

export const useRoute = vi.fn(() => ({
  meta: {
    menuItem: "one menu item",
  },
  name: "vehicles",
  path: vi.fn(),
  params: {
    id: "1234",
  },
}));
