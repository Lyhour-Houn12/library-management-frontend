import {
  IconButton,
  InputAdornment,
  TextField as TextFieldUi,
} from "@mui/material";
import { Clear as ClearIcon, Search as SearchIcon } from "@mui/icons-material";

const TextField = ({
  searchTerm,
  setSearchTerm,
  placeholderTitle,
  handleClearSearch,
}) => {
  return (
    <TextFieldUi
      fullWidth
      value={searchTerm}
      placeholder={placeholderTitle}
      onChange={(e) => setSearchTerm(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),

          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                edge="end"
                onClick={handleClearSearch}
                aria-label="clear search"
                sx={{
                  mr: 0.5,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "background.paper",
          borderRadius: 2,
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.12)",
          },
          "& fieldset": {
            borderColor: "divider",
          },
          "&:hover fieldset": {
            borderColor: "primary.main",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
          },
        },

        "& .MuiInputBase-input": {
          py: 1.4,
          height: 33.5,
        },
      }}
    />
  );
};

export default TextField;
