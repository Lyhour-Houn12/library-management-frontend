import {
  Add,
  Close,
  CloudUpload,
  MenuBook,
  Save,
  Upload,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useUploadImage } from "./useUploadImage";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../../store/features/books/bookThunk";
import toast from "react-hot-toast";
import { fetchActiveGenres } from "../../../store/features/genres/genreThunk";

const UploadButton = styled(Paper)(({ theme, isDragActive }) => ({
  padding: theme.spacing(3),
  border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: isDragActive ? theme.palette.action.hover : "transparent",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.2s ease",
    backgroundColor: "var(--color-card)",

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#667eea",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#667eea",
      borderWidth: "2px",
    },
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#667eea",
  },

  "& .MuiFormHelperText-root": {
    marginLeft: 2,
  },
};

const BookForm = ({
  dialogOpen,
  handleCloseDialog,
  formData,
  setFormData,
  resetForm,
  editingBooks,
  viewBook,
}) => {
  const updateField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const dispatch = useDispatch();
  const { activeGenres } = useSelector((state) => state.genres);
  const { actionLoading } = useSelector((state) => state.books);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        await dispatch(fetchActiveGenres()).unwrap();
      } catch (error) {
        console.error(error);
      }
    };

    loadGenres();
  }, [dispatch]);

  const {
    isDragActive,
    uploading,
    uploadError,
    coverImageFile,
    handleFileChange,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useUploadImage({ formData, setFormData });

  const handleAddBook = async () => {
    const { coverImageUrl, ...bookDataToSend } = formData;

    try {
      await dispatch(
        createBook({
          bookData: bookDataToSend,
          coverImageFile,
        }),
      ).unwrap();

      toast.success("Book created successfully");

      handleCloseDialog();
    } catch (error) {
      console.error("Failed to create book:", error);

      toast.error(error?.message || error || "Failed to create book");
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "18px",
          overflow: "hidden",
          backgroundColor: "var(--color-card)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.18)",
        },
      }}
    >
      {/* ================= HEADER ================= */}
      <DialogTitle
        sx={{
          p: 0,
          background:
            "linear-gradient(135deg, rgba(102,126,234,0.12), rgba(118,75,162,0.08))",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 6px 18px rgba(102,126,234,0.3)",
              }}
            >
              <MenuBook />
            </Box>

            {/* Title */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  lineHeight: 1.3,
                }}
              >
                {editingBooks ? "Edit Book" : "Add Book"}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-text-secondary)",
                  mt: 0.3,
                }}
              >
                {editingBooks
                  ? "Edit the book information"
                  : "Create a new book in your library"}
              </Typography>
            </Box>
          </Box>

          {/* Close */}
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              color: "var(--color-text-secondary)",

              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.06)",
                color: "var(--color-text-primary)",
              },
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      {/* ================= CONTENT ================= */}
      <DialogContent
        dividers
        sx={{
          px: 3,
          py: 3,
          borderColor: "var(--color-border)",
        }}
      >
        {/* ================= BASIC INFORMATION ================= */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            Basic Information
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "var(--color-text-secondary)",
              mt: 0.3,
            }}
          >
            Enter the basic information about this book.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* ISBN */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="ISBN"
              value={formData?.isbn || ""}
              onChange={(e) => updateField("isbn", e.target.value)}
              required
              placeholder="978-3-16-148410-0"
              sx={inputStyles}
            />
          </Grid>

          {/* Title */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Title"
              value={formData?.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
              required
              placeholder="Enter book title"
              sx={inputStyles}
            />
          </Grid>

          {/* Author */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Author"
              value={formData?.author || ""}
              onChange={(e) => updateField("author", e.target.value)}
              required
              placeholder="Enter author name"
              sx={inputStyles}
            />
          </Grid>

          {/* Genre */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth required sx={inputStyles}>
              <InputLabel>Genre</InputLabel>

              <Select
                value={formData?.genreId ?? ""}
                onChange={(e) => updateField("genreId", e.target.value)}
                label="Genre"
              >
                <MenuItem value="">
                  <em>Select a genre</em>
                </MenuItem>

                {activeGenres?.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Publisher */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Publisher"
              value={formData?.publisher || ""}
              onChange={(e) => updateField("publisher", e.target.value)}
              placeholder="Enter publisher"
              sx={inputStyles}
            />
          </Grid>

          {/* Language */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Language"
              value={formData?.language || ""}
              onChange={(e) => updateField("language", e.target.value)}
              placeholder="e.g. English"
              sx={inputStyles}
            />
          </Grid>
        </Grid>

        {/* ================= PUBLICATION INFORMATION ================= */}
        <Box
          sx={{
            mt: 3,
            mb: 2,
            pt: 2,
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            Publication Information
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "var(--color-text-secondary)",
              mt: 0.3,
            }}
          >
            Provide publication details for this book.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Publication Date */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Publication Date"
              type="date"
              value={formData?.publicationDate || ""}
              onChange={(e) => updateField("publicationDate", e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={inputStyles}
            />
          </Grid>

          {/* Pages */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Pages"
              type="number"
              value={formData?.pages ?? ""}
              onChange={(e) =>
                updateField(
                  "pages",
                  e.target.value === "" ? "" : parseInt(e.target.value, 10),
                )
              }
              placeholder="e.g. 350"
              slotProps={{
                min: 0,
              }}
              sx={inputStyles}
            />
          </Grid>

          {/* Price */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={formData?.price ?? ""}
              onChange={(e) =>
                updateField(
                  "price",
                  e.target.value === "" ? "" : parseFloat(e.target.value),
                )
              }
              placeholder="0.00"
              inputProps={{
                min: 0,
                step: 0.01,
              }}
              sx={inputStyles}
            />
          </Grid>
        </Grid>

        {/* ================= INVENTORY ================= */}
        <Box
          sx={{
            mt: 3,
            mb: 2,
            pt: 2,
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            Inventory
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "var(--color-text-secondary)",
              mt: 0.3,
            }}
          >
            Configure the number of copies available in your library.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Total Copies */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Total Copies"
              type="number"
              value={formData?.totalCopies ?? 1}
              onChange={(e) => {
                const total =
                  e.target.value === ""
                    ? ""
                    : Math.max(1, parseInt(e.target.value, 10));

                setFormData({
                  ...formData,
                  totalCopies: total,
                  availableCopies:
                    formData?.availableCopies > total
                      ? total
                      : formData?.availableCopies,
                });
              }}
              required
              helperText="Total number of copies in inventory"
              inputProps={{
                min: 1,
              }}
              sx={inputStyles}
            />
          </Grid>

          {/* Available Copies */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Available Copies"
              type="number"
              value={formData?.availableCopies ?? 0}
              onChange={(e) => {
                const available =
                  e.target.value === ""
                    ? ""
                    : Math.max(0, parseInt(e.target.value, 10));

                const total = Number(formData?.totalCopies) || 0;

                setFormData({
                  ...formData,
                  availableCopies:
                    available === "" ? "" : Math.min(available, total),
                });
              }}
              required
              helperText="Copies currently available for checkout"
              inputProps={{
                min: 0,
                max: formData?.totalCopies,
              }}
              sx={inputStyles}
            />
          </Grid>
        </Grid>

        {/* ================= DESCRIPTION ================= */}
        <Box
          sx={{
            mt: 3,
            mb: 2,
            pt: 2,
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            Description
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "var(--color-text-secondary)",
              mt: 0.3,
            }}
          >
            Add a short description of the book.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={formData?.description || ""}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe this book..."
              sx={inputStyles}
            />
          </Grid>

          {/* Cover Image URL */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Cover Image
            </Typography>

            <input
              id="cover-image-upload"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {!formData.coverImageUrl ? (
              <label htmlFor="cover-image-upload">
                <UploadButton
                  elevation={0}
                  isDragActive={isDragActive}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  sx={{ cursor: uploading ? "not-allowed" : "pointer" }}
                >
                  {uploading ? (
                    <Box>
                      <CircularProgress size={40} sx={{ mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        Uploading...
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <CloudUpload
                        sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
                      />
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        Click to upload or drag and drop
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        PNG, JPG, JPEG up to 5MB
                      </Typography>
                    </Box>
                  )}
                </UploadButton>

                {uploadError && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {uploadError}
                  </Typography>
                )}
              </label>
            ) : (
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  component="img"
                  src={formData.coverImageUrl}
                  alt="Book Cover Preview"
                  sx={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "contain",
                    backgroundColor: "grey.100",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() =>
                      setFormData({ ...formData, coverImageUrl: "" })
                    }
                    sx={{ boxShadow: 2 }}
                  >
                    Remove
                  </Button>
                  <label htmlFor="cover-image-upload">
                    <Button
                      size="small"
                      variant="contained"
                      component="span"
                      startIcon={<Upload />}
                      sx={{ boxShadow: 2 }}
                    >
                      Replace
                    </Button>
                  </label>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      {/* ================= ACTIONS ================= */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          gap: 1,
          backgroundColor: "rgba(0,0,0,0.015)",
        }}
      >
        <Button
          onClick={handleCloseDialog}
          color="inherit"
          sx={{
            px: 2.5,
            py: 1,
            borderRadius: "10px",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>

        {!viewBook && (
          <Button
            onClick={handleAddBook}
            variant="contained"
            startIcon={
              actionLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : editingBooks ? (
                <Save />
              ) : (
                <Add />
              )
            }
            disabled={actionLoading}
            sx={{
              px: 2.8,
              py: 1,
              borderRadius: "10px",
              fontWeight: 600,
              textTransform: "none",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 5px 14px rgba(102,126,234,0.3)",
              transition: "all 0.2s ease",

              "&:hover": {
                background: "linear-gradient(135deg, #5a6fd6 0%, #68418f 100%)",
                boxShadow: "0 7px 20px rgba(102,126,234,0.4)",
                transform: "translateY(-1px)",
              },
            }}
          >
            {actionLoading
              ? editingBooks
                ? "Saving..."
                : "Creating..."
              : editingBooks
                ? "Save Changes"
                : "Create Book"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookForm;
