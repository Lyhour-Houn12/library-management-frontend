import { Chip } from "@mui/material";

export const columns = [
  {
    field: "coverImage",
    headerName: "Cover",
    renderCell: (row) => (
      <img
        src={row.coverImage || "/placeholder-book.jpg"}
        alt={row.title}
        style={{
          width: 40,
          height: 56,
          objectFit: "cover",
          borderRadius: 4,
        }}
      />
    ),
  },
  {
    field: "isbn",
    headerName: "ISBN",
    minWidth: 230,
  },
  {
    field: "title",
    headerName: "Title",
    minWidth: 180,
  },
  {
    field: "author",
    headerName: "Author",
    minWidth: 150,
  },
  {
    field: "genreName",
    headerName: "Genre",
    renderCell: (row) => (
      <Chip
        label={row.genreName || "N/A"}
        size="small"
        color="primary"
        variant="outlined"
      />
    ),
  },
  {
    field: "totalCopies",
    headerName: "Total Copies",
    align: "center",
  },
  {
    field: "availableCopies",
    headerName: "Available Copies",
    align: "center",
    renderCell: (row) => (
      <Chip
        label={row.availableCopies}
        size="small"
        color={row.availableCopies > 0 ? "success" : "error"}
      />
    ),
  },
  {
    field: "publishedYear",
    headerName: "Year",
    align: "center",
    renderCell: (row) => (
      <Chip label={row.publicationDate} size="small" color="default" />
    ),
  },
];
