// src/components/SearchComponent.tsx



// "use client";

// import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
// import debounce from "lodash.debounce";
// import { useSearch } from "@/app/context/SearchContext"; // Import the context

// export default function SearchComponent() {
//   const [query, setQuery] = useState("");
//   const { setSearchResults, setDefaultUsers } = useSearch(); // Get context functions

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`/api/searchBar?query=${query}`);
//         const data = await response.json();

//         if (query.length === 0) {
//           setSearchResults([]);  // Reset search results
//           setDefaultUsers(data.users || []); // Store default users when search is empty
//         } else {
//           setSearchResults(data.users || []); // Store search results
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     const debouncedFetch = debounce(fetchUsers, 300);
//     debouncedFetch();

//     return () => debouncedFetch.cancel();
//   }, [query]);

//   return (
//     <TextField
//       label="Hľadať používateľov"
//       variant="outlined"
//       fullWidth
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//       sx={{ mt: 2 }}
//     />
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { TextField, useTheme } from "@mui/material";
import debounce from "lodash.debounce";
import { useSearch } from "@/app/context/SearchContext"; // Import the context

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const { setSearchResults, setDefaultUsers } = useSearch(); // Get context functions
  const theme = useTheme(); // Access the theme provider

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/searchBar?query=${query}`);
        const data = await response.json();

        if (query.length === 0) {
          setSearchResults([]);  // Reset search results
          setDefaultUsers(data.users || []); // Store default users when search is empty
        } else {
          setSearchResults(data.users || []); // Store search results
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    const debouncedFetch = debounce(fetchUsers, 300);
    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [query, setSearchResults, setDefaultUsers]);

  return (
    <TextField
      label="Hľadať používateľov"
      variant="outlined"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      sx={{
        width: "70%", // 50% width
        // height: "200px", // 40px tall
        mt: 2,
        "& .MuiInputBase-root": {
          padding: "10px 20px", // Adjust padding inside the input field
          borderRadius: "20px", // Rounded corners
          border: `2px solid ${theme.palette.primary.main}`, // Use theme color
          backgroundColor: theme.palette.background.paper, // Use theme background color
          fontSize: "28px", // Smaller font size for a compact look
          transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
        },
        "& .MuiInputBase-input": {
          padding: "0", // Adjust input padding
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.dark, // Darken on hover
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.dark, // Darken on focus
        },
        "& .MuiFormLabel-root": {
          fontSize: "13px", // Smaller label size for compact design
          padding: "10px 0px",
          color: theme.palette.text.secondary, // Lighter text color for label
        },
      }}
    />
  );
}
