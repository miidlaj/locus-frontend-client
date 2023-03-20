import create from "zustand";

type Facility = {
  id: number;
  name: string;
  description: string;
};

type Category = {
  id: number;
  name: string;
  description: string;
};

type CacheStore = {
  facilities: Facility[];
  categories: Category[];
  setFacilities: (facilities: Facility[]) => void;
  setCategories: (categories: Category[]) => void;
  clearCache: () => void;
};

// Create a function that returns the initial state of the store
const useCacheStore = create<CacheStore>((set) => ({
  facilities: [],
  categories: [],
  setFacilities: (facilities) => set({ facilities }),
  setCategories: (categories) => set({ categories }),
  clearCache: () => set({ facilities: [], categories: [] }),
}));

export default useCacheStore;