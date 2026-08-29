import {
  Box,
  Button as ButtonClear,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Button from "../../shared/Button";
import TextField from "../../shared/TextField";
import DataTable from "../../components/DataTable";
import { columns } from "./TableColumn";
import BookForm from "./BookForm";
import { useState } from "react";

const fakeBooks = [
  {
    id: 1,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genreName: "Classic",
    totalCopies: 10,
    availableCopies: 6,
    publicationDate: 1925,
  },
  {
    id: 2,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genreName: "Fiction",
    totalCopies: 8,
    availableCopies: 3,
    publicationDate: 1960,
  },
  {
    id: 3,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    title: "1984",
    author: "George Orwell",
    genreName: "Dystopian",
    totalCopies: 12,
    availableCopies: 0,
    publicationDate: 1949,
  },
  {
    id: 4,
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genreName: "Romance",
    totalCopies: 7,
    availableCopies: 5,
    publicationDate: 1813,
  },
  {
    id: 5,
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genreName: "Fantasy",
    totalCopies: 15,
    availableCopies: 9,
    publicationDate: 1937,
  },
  {
    id: 6,
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    title: "The Alchemist",
    author: "Paulo Coelho",
    genreName: "Adventure",
    totalCopies: 10,
    availableCopies: 2,
    publicationDate: 1988,
  },
];

const AdminBookPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    genreId: "",
    publisher: "",
    publicationDate: "",
    language: "",
    pages: "",
    description: "",
    totalCopies: 1,
    availableCopies: 1,
    price: "",
    coverImageUrl: "",
    active: true,
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAdd = () => {
    setOpenDialog(true);
  };

  return (
    <Box>
      {/* PAGE HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: "var(--color-textPrimary)",
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            Book Management
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Manage your collection's books
          </Typography>
        </Box>

        <Button icon={<AddIcon />} title="Add Book" handleClick={handleAdd} />
      </Box>

      {/* FILTER */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 2.5 },
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Grid container spacing={1.5} alignItems="center">
          {/* Search */}
          <Grid size={{ xs: 12, sm: 12, md: 3 }}>
            <TextField placeholderTitle="Search by title, author, or ISBN" />
          </Grid>

          {/* Genre */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>

              <Select
                label="Genre"
                defaultValue=""
                sx={{
                  height: 56,
                  borderRadius: 2,
                }}
              >
                <MenuItem value="">All Genres</MenuItem>
                <MenuItem value="FICTION">Fiction</MenuItem>
                <MenuItem value="SCIENCE">Science</MenuItem>
                <MenuItem value="HISTORY">History</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Availability */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>

              <Select
                label="Availability"
                defaultValue=""
                sx={{
                  height: 56,
                  borderRadius: 2,
                }}
              >
                <MenuItem value="">All Books</MenuItem>
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="CHECKED_OUT">Checked Out</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Sort */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>

              <Select
                label="Sort By"
                defaultValue="createdAt-desc"
                sx={{
                  height: 56,
                  borderRadius: 2,
                }}
              >
                <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                <MenuItem value="title-desc">Title (Z-A)</MenuItem>
                <MenuItem value="author-asc">Author (A-Z)</MenuItem>
                <MenuItem value="author-desc">Author (Z-A)</MenuItem>
                <MenuItem value="createdAt-desc">Newest First</MenuItem>
                <MenuItem value="createdAt-asc">Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Clear Filters */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <ButtonClear
              fullWidth
              variant="outlined"
              startIcon={<ClearAllIcon />}
              sx={{
                height: 56,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Clear Filters
            </ButtonClear>
          </Grid>
        </Grid>
      </Paper>

      <DataTable
        columns={columns}
        data={fakeBooks}
        actions
        onView={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />

      <BookForm
        dialogOpen={openDialog}
        handleCloseDialog={handleCloseDialog}
        formData={formData}
        setFormData={setFormData}
      />
    </Box>
  );
};

export default AdminBookPage;
