import { Add, Close, AccountTree, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

const GenreForm = ({
  dialogOpen,
  handleCloseDialog,
  formData,
  setFormData,
  editingGenres,
  getRootGenres,
  handleSubmit,
  viewGenre,
}) => {
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

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleCloseDialog}
      maxWidth="sm"
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
              <Add />
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
                {editingGenres ? "Edit Genre" : "Add Genre"}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-text-secondary)",
                  mt: 0.3,
                }}
              >
                {editingGenres ? "Edit Form Genre" : "Create a new book genre"}
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
        {/* Basic Information */}
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
            Enter the basic information for this genre.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Genre Code */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Genre Code"
              value={formData?.code || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  code: e.target.value.toUpperCase(),
                })
              }
              required
              placeholder="e.g. PROGRAMMING"
              helperText="Unique uppercase identifier"
              sx={inputStyles}
            />
          </Grid>

          {/* Genre Name */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Genre Name"
              value={formData?.name || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              required
              placeholder="e.g. Programming"
              sx={inputStyles}
            />
          </Grid>

          {/* Description */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Description"
              value={formData?.description || ""}
              rows={3}
              multiline
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Describe what types of books belong to this genre..."
              sx={inputStyles}
            />
          </Grid>

          {/* ================= ORGANIZATION ================= */}

          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                mt: 1,
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
                Organization
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-text-secondary)",
                  mt: 0.3,
                }}
              >
                Configure the hierarchy and display order.
              </Typography>
            </Box>
          </Grid>

          {/* Display Order */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Display Order"
              type="number"
              value={formData?.displayOrder ?? 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  displayOrder: parseInt(e.target.value) || 0,
                })
              }
              required
              inputProps={{ min: 0 }}
              helperText="Lower numbers appear first"
              sx={inputStyles}
            />
          </Grid>

          {/* Parent Genre */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth sx={inputStyles}>
              <InputLabel>Parent Genre</InputLabel>

              <Select
                value={formData?.parentGenreId ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    parentGenreId: e.target.value || null,
                  })
                }
                label="Parent Genre"
                startAdornment={
                  <AccountTree
                    sx={{
                      mr: 1,
                      color: "var(--color-text-secondary)",
                      fontSize: 20,
                    }}
                  />
                }
              >
                <MenuItem value="">
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      None
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      Root Genre
                    </Typography>
                  </Box>
                </MenuItem>

                {getRootGenres().map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ================= STATUS ================= */}

          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                mt: 1,
                p: 2,
                borderRadius: "14px",
                border: "1px solid var(--color-border)",
                backgroundColor: "rgba(102,126,234,0.035)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                  }}
                >
                  Active Status
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--color-text-secondary)",
                    mt: 0.3,
                  }}
                >
                  {formData?.active !== false
                    ? "This genre is currently active."
                    : "This genre is currently inactive."}
                </Typography>
              </Box>
              <FormControlLabel
                sx={{ m: 0 }}
                labelPlacement="start"
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mr: 0.5,
                    }}
                  >
                    {formData?.active !== false ? "Active" : "Inactive"}
                  </Typography>
                }
                control={
                  <Switch
                    checked={
                      formData?.active !== undefined ? formData.active : true
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        active: e.target.checked,
                      })
                    }
                    color="primary"
                  />
                }
              />
            </Box>
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
        {!viewGenre && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<Add />}
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
            {editingGenres ? "Edit Genre" : "Create Genre"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GenreForm;
