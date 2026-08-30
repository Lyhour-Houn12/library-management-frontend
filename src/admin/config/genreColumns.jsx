import { Box, Chip, Typography } from "@mui/material";
import {
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
} from "@mui/icons-material";
export const columns = [
  {
    field: "code",
    headerName: "Genre Code",
    minWidth: 200,
    renderCell: (row) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {row.parentGenreId ? (
          <FolderIcon color="action" />
        ) : (
          <FolderOpenIcon color="primary" />
        )}
        <Typography
          variant="body2"
          sx={{ fontWeight: row.parentGenreId ? 600 : 400 }}
        >
          {row.code}
        </Typography>
      </Box>
    ),
  },
  {
    field: "name",
    headerName: "Genre Name",
    minWidth: 160,
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 250,
  },
  {
    field: "parentName",
    headerName: "Parent Genre",
    renderCell: (row) => {
      if (!row.parentGenreId) {
        return (
          <Chip size="small" label="Root" color="primary" variant="outlined" />
        );
      }

      return <Chip size="small" label={row.parentGenreName || "N/A"} />;
    },
  },
  {
    field: "bookCount",
    headerName: "Books",
    align: "center",
    renderCell: (row) => (
      <Chip
        label={row.bookCount || 0}
        size="small"
        color="info"
        variant="outlined"
      />
    ),
  },
  {
    field: "displayOrder",
    headerName: "Display Order",
    align: "center",
    renderCell: (row) => (
      <Chip
        label={row.displayOrder || 0}
        size="small"
        color="info"
        variant="outlined"
      />
    ),
  },
  {
    field: "active",
    headerName: "Status",
    renderCell: (row) => (
      <Chip
        label={row.active ? "Active" : "Inactive"}
        color={row.active ? "success" : "default"}
        size="small"
      />
    ),
  },
];
