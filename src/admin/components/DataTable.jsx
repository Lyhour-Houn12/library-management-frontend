import {
  alpha,
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";

const DataTable = ({
  columns = [],
  selectable = false,
  selected = [],
  data = [],
  loading = false,
  emptyMessage = "No data found",
  onSelectOne,
  onSelectAll,
  actions = false,
  customActions,
  onView,
  onDelete,
  onEdit,

  page = 0,
  rowPerPage = 10,
  totalRow = 0,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const isSelected = (id) => selected.includes(id);

  const handleSelectOne = (id) => {
    onSelectOne?.(id);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      onSelectAll?.(data.map((row) => row.id));
    } else {
      onSelectAll?.([]);
    }
  };

  const renderCellContent = (row, column) => {
    const value = row[column.field];

    if (column.renderCell) {
      return column.renderCell(row);
    }

    if (column.type === "chip") {
      const chipProps = column.getChipProps ? column.getChipProps(value) : {};

      return (
        <Chip
          label={value}
          size="small"
          sx={{
            fontWeight: 600,
            borderRadius: 1.5,
          }}
          {...chipProps}
        />
      );
    }

    if (column.type === "date") {
      return value ? new Date(value).toLocaleDateString() : "-";
    }

    if (column.type === "currency") {
      return value != null ? `$${parseFloat(value).toFixed(2)}` : "$0.00";
    }

    return value ?? "-";
  };

  const hasActions = actions || customActions;

  const totalColumns =
    columns.length + (selectable ? 1 : 0) + (hasActions ? 1 : 0);

  // Only show the "no data" row once loading has finished AND there truly is
  // nothing to show. This prevents a flash of "No data found" while a fetch
  // is in flight (e.g. right after changing rows-per-page).
  const showEmptyState = !loading && data.length === 0;

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <TableContainer
        sx={{
          position: "relative",
          maxHeight: 650,
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: 7,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "divider",
            borderRadius: 10,
          },
        }}
      >
        {/* ================= LOADING OVERLAY =================
            Renders on top of the existing rows instead of replacing
            them, so pagination / rows-per-page changes feel smooth
            instead of causing the whole table to collapse and rebuild. */}
        {loading && data.length > 0 && (
          <Box
            sx={{
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              height: 0,
              zIndex: 3,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: "0 0 auto 0",
                display: "flex",
                justifyContent: "center",
                pt: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 0.75,
                  borderRadius: 5,
                  bgcolor: "background.paper",
                  boxShadow: 3,
                }}
              >
                <CircularProgress size={16} />
                <Typography variant="caption" color="text.secondary">
                  Rendering...
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Table
          stickyHeader
          sx={{
            minWidth: 750,
            borderCollapse: "separate",
            borderSpacing: 0,
            // Dim (not remove) existing rows while a refetch is happening
            opacity: loading && data.length > 0 ? 0.5 : 1,
            transition: "opacity 0.15s ease",
            pointerEvents: loading ? "none" : "auto",
          }}
        >
          {/* ================= HEADER ================= */}
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell
                  padding="checkbox"
                  sx={{
                    bgcolor: "background.paper",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Checkbox
                    size="small"
                    indeterminate={
                      selected.length > 0 && selected.length < data.length
                    }
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              )}

              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align || "left"}
                  sx={{
                    bgcolor: "background.paper",
                    color: "text.secondary",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                    minWidth: column.minWidth,
                    py: 1.8,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}

              {hasActions && (
                <TableCell
                  align="center"
                  sx={{
                    bgcolor: "background.paper",
                    color: "text.secondary",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                    py: 1.8,
                    minWidth: 130,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {/* ================= BODY ================= */}
          <TableBody>
            {loading && data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={totalColumns}
                  align="center"
                  sx={{
                    py: 10,
                    borderBottom: "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <CircularProgress size={30} />

                    <Typography variant="body2" color="text.secondary">
                      Loading data...
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : showEmptyState ? (
              <TableRow>
                <TableCell
                  colSpan={totalColumns}
                  align="center"
                  sx={{
                    py: 10,
                    borderBottom: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={500}
                  >
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    key={row.id}
                    hover
                    selected={isItemSelected}
                    sx={{
                      transition: "background-color 0.15s ease",

                      "&:last-child td": {
                        borderBottom: 0,
                      },

                      "&.Mui-selected": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.06),
                      },

                      "&.Mui-selected:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.09),
                      },
                    }}
                  >
                    {/* CHECKBOX */}
                    {selectable && (
                      <TableCell
                        padding="checkbox"
                        sx={{
                          py: 1.5,
                        }}
                      >
                        <Checkbox
                          size="small"
                          checked={isItemSelected}
                          onChange={() => handleSelectOne(row.id)}
                        />
                      </TableCell>
                    )}

                    {/* DATA CELLS */}
                    {columns.map((column) => (
                      <TableCell
                        key={column.field}
                        align={column.align || "left"}
                        sx={{
                          py: 1.7,
                          color: "text.primary",
                          fontSize: "0.875rem",
                          whiteSpace: column.noWrap ? "nowrap" : "normal",
                        }}
                      >
                        {renderCellContent(row, column)}
                      </TableCell>
                    ))}

                    {/* ACTIONS */}
                    {hasActions && (
                      <TableCell
                        align="center"
                        sx={{
                          py: 1.2,
                        }}
                      >
                        {customActions ? (
                          customActions(row)
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 0.5,
                            }}
                          >
                            {onView && (
                              <Tooltip title="View" arrow>
                                <IconButton
                                  size="small"
                                  onClick={() => onView(row)}
                                  sx={{
                                    color: "info.main",
                                    bgcolor: (theme) =>
                                      alpha(theme.palette.info.main, 0.08),
                                    "&:hover": {
                                      bgcolor: (theme) =>
                                        alpha(theme.palette.info.main, 0.16),
                                    },
                                  }}
                                >
                                  <ViewIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}

                            {onEdit && (
                              <Tooltip title="Edit" arrow>
                                <IconButton
                                  size="small"
                                  onClick={() => onEdit(row)}
                                  sx={{
                                    color: "primary.main",
                                    bgcolor: (theme) =>
                                      alpha(theme.palette.primary.main, 0.08),
                                    "&:hover": {
                                      bgcolor: (theme) =>
                                        alpha(theme.palette.primary.main, 0.16),
                                    },
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}

                            {onDelete && (
                              <Tooltip title="Delete" arrow>
                                <IconButton
                                  size="small"
                                  onClick={(e) => onDelete(e, row)}
                                  sx={{
                                    color: "error.main",
                                    bgcolor: (theme) =>
                                      alpha(theme.palette.error.main, 0.08),
                                    "&:hover": {
                                      bgcolor: (theme) =>
                                        alpha(theme.palette.error.main, 0.16),
                                    },
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalRow > 0 && (
        <TablePagination
          component="div"
          count={totalRow}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      )}
    </Paper>
  );
};

export default DataTable;
