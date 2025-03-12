"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  defaultUsers: { id: string; name: string; image: string | null }[];
  setDefaultUsers: React.Dispatch<
    React.SetStateAction<{ id: string; name: string; image: string | null }[]>
  >;
  searchResults: { id: string; name: string; image: string | null }[];
  setSearchResults: React.Dispatch<
    React.SetStateAction<{ id: string; name: string; image: string | null }[]>
  >;
}

// Create the context with an initial null value
export const SearchContext = createContext<SearchContextType | null>(null);

interface SearchProviderProps {
  children: ReactNode;
}

// Context Provider component
export function SearchProvider({ children }: SearchProviderProps) {
  const [defaultUsers, setDefaultUsers] = useState<
    { id: string; name: string; image: string | null }[]
  >([]);
  const [searchResults, setSearchResults] = useState<
    { id: string; name: string; image: string | null }[]
  >([]);

  return (
    <SearchContext.Provider
      value={{ defaultUsers, setDefaultUsers, searchResults, setSearchResults }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// Custom hook to use the SearchContext
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
