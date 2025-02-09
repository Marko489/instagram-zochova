// src/components/SearchComponent.tsx

// "use client";

// import { useState, useEffect } from "react";
// import { TextField, List, ListItem, Avatar } from "@mui/material";
// import debounce from "lodash.debounce";

// export default function SearchComponent() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<{ id: string; name: string; image: string | null }[]>([]);

//   useEffect(() => {
//     if (query.length === 0) {
//       setResults([]);
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`/api/searchBar?query=${query}`);
//         const data = await response.json();
//         setResults(data.users || []);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     const debouncedFetch = debounce(fetchUsers, 300);
//     debouncedFetch();

//     return () => debouncedFetch.cancel();
//   }, [query]);

//   return (
//     <div>
//       <TextField
//         label="Hľadať používateľov"
//         variant="outlined"
//         fullWidth
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         sx={{ mt: 2 }}
//       />
//       {results.length > 0 && (
//         <List>
//           {results.map((user) => (
//             <ListItem key={user.id}>
//               {user.image && <Avatar src={user.image} alt={user.name} />}
//               {user.name}
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </div>
//   );
// }





"use client";
// import { useState, useEffect } from "react";
// import { TextField, List, ListItem, Avatar } from "@mui/material";
// import debounce from "lodash.debounce";
// import { useTheme } from "@mui/material/styles";

// export default function SearchComponent() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<{ id: string; name: string; image: string | null }[]>([]);
//   const theme = useTheme();

//   useEffect(() => {
//     if (query.length === 0) {
//       setResults([]);
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`/api/searchBar?query=${query}`);
//         const data = await response.json();
//         setResults(data.users || []);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     const debouncedFetch = debounce(fetchUsers, 300);
//     debouncedFetch();

//     return () => debouncedFetch.cancel();
//   }, [query]);

//   const highlightMatch = (text: string) => {
//     if (!query) return text;
//     const regex = new RegExp(`(${query})`, "gi");
//     return text.split(regex).map((part: string, index: number) =>
//       regex.test(part) ? (
//         <span
//           key={index}
//           style={{
//             color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
//             fontWeight: "bold",
//           }}
//         >
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   return (
//     <div>
//       <TextField
//         label="Hľadať používateľov"
//         variant="outlined"
//         fullWidth
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         sx={{ mt: 2 }}
//       />
//       {results.length > 0 && (
//         <List>
//           {results.map((user) => (
//             <ListItem key={user.id}>
//               {user.image && <Avatar src={user.image} alt={user.name} />}
//               {highlightMatch(user.name)}
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { TextField, List, ListItem, Avatar } from "@mui/material";
import debounce from "lodash.debounce";
import { useTheme } from "@mui/material/styles";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; name: string; image: string | null }[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/searchBar?query=${query}`);
        const data = await response.json();
        setResults(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const debouncedFetch = debounce(fetchUsers, 300);
    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [query]);

  const highlightMatch = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          style={{
            color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
            fontWeight: "bold",
          }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      <TextField
        label="Hľadať používateľov"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mt: 2 }}
      />
      {results.length > 0 && (
        <List
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderTop: "none",
            padding: "5px 0",
            margin: 0,
            borderRadius: "4px",
          }}
        >
          {results.map((user) => (
            <ListItem
              key={user.id}
              sx={{
                padding: "5px 0",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
            >
              {user.image && <Avatar src={user.image} alt={user.name} sx={{ marginLeft: "8px", marginRight: "8px" }} />}
              <span style={{ marginLeft: "8px" }}>{highlightMatch(user.name)}</span>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
