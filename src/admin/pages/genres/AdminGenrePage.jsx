import { Add as AddIcon } from "@mui/icons-material";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import Button from "../../shared/Button";
import { useEffect, useRef, useState } from "react";
import TextField from "../../shared/TextField";
import GenreState from "./GenreState";
import DataTable from "../../components/DataTable";
import { columns } from "../../config/genreColumns";
import GenreForm from "./GenreForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createGenre,
  deleteGenre,
  fetchGenres,
  updateGenre,
} from "../../../store/features/genres/genreThunk";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";
import ConfirmDeleteModal from "../../shared/ConfirmDeleteModal";
import { useDeleteWithConfirm } from "../../hooks/useDeleteWithConfirm";

const initialFormState = {
  code: "",
  name: "",
  description: "",
  parentGenreId: null,
  displayOrder: null,
};

const AdminGenrePage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // instant — drives the TextField
  const [searchTerm, setSearchTerm] = useState(""); // debounced — drives the fetch
  const [editingGenre, setEditingGenre] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [viewGenre, setViewGenre] = useState("");
  const dispatch = useDispatch();
  const { genres, paginatedGenres, loading, actionLoading } = useSelector(
    (state) => state.genres,
  );
  const isFirstRender = useRef(true);

  //Pagination State
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const rowsPerPage = parseInt(searchParams.get("size") ?? "10", 10);

  const {
    anchorEl,
    menuOpen,
    selectedItem: selectedGenre,
    confirmOpen,
    loading: deleteLoading,
    openMenu: handleDeleteClick,
    closeMenu: handleMenuClose,
    chooseMode: handleChooseDeleteMode,
    closeConfirm: handleConfirmClose,
    confirmHardDelete,
  } = useDeleteWithConfirm(
    (genre, hard) =>
      dispatch(deleteGenre({ genreId: genre.id, hard })).unwrap(),
    {
      getSuccessMessage: (hard) =>
        hard ? "Genre permanently deleted" : "Genre deactivated",
      onSuccess: (message, err) => {
        if (err) {
          toast.error(err || "Failed to delete genre");
        } else {
          toast.success(message);
          refreshGenre();
        }
      },
    },
  );

  const setPage = (newPage) => {
    if (newPage == page) return;
    setSearchParams((prev) => {
      prev.set("page", newPage);
      return prev;
    });
  };

  const setRowsPerPage = (newSize) => {
    setSearchParams((prev) => {
      prev.set("size", newSize);
      prev.set("page", 1);
      return prev;
    });
  };
  // Debounce: wait 300ms after the user stops typing before update searchTerm
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer); // cancel the pending timer if user types again
  }, [searchInput]);

  const refreshGenre = () =>
    dispatch(fetchGenres({ searchTerm, page: page - 1, size: rowsPerPage }));

  useEffect(() => {
    refreshGenre();
  }, [page, rowsPerPage, searchTerm]);

  const handleSubmit = async () => {
    try {
      if (editingGenre) {
        await dispatch(
          updateGenre({ genreId: editingGenre.id, genreData: formData }),
        ).unwrap();
        handleCloseDialog();
      } else {
        await dispatch(createGenre(formData)).unwrap();
        handleCloseDialog();
      }

      toast.success(
        editingGenre ? "Edit Genre Successfully" : "Add Genre Successfully",
      );

      if (page === 1) {
        refreshGenre();
      } else {
        setPage(1); // triggers the effect above, refetching page 1
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const getRootGenres = () => {
    const roots = (paginatedGenres.content || []).filter(
      (genre) => genre.parentGenreId == null,
    );
    return roots;
  };

  const handleView = (genre) => {
    setViewGenre(genre);
    setEditingGenre(null);
    setFormData({
      code: genre.code || "",
      name: genre.name || "",
      description: genre.description || "",
      displayOrder: genre.displayOrder ?? 0,
      parentGenreId: genre.parentGenreId ?? null,
      active: genre.active ?? true,
    });

    setOpenDialog(true);
  };

  const handleAdd = () => {
    setViewGenre(null);
    setEditingGenre(null);
    setFormData(initialFormState);
    setOpenDialog(true);
  };
  const handleEdit = (genre) => {
    setViewGenre(null);
    setEditingGenre(genre);

    setFormData({
      code: genre.code || "",
      name: genre.name || "",
      description: genre.description || "",
      displayOrder: genre.displayOrder ?? 0,
      parentGenreId: genre.parentGenreId ?? null,
      active: genre.active ?? true,
    });

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingGenre(null);
    setFormData(initialFormState);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    setPage(1);
  };

  return (
    <Box>
      {/* PAGE HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ color: "var(--color-textPrimary)", fontWeight: 700, mb: 0.5 }}
          >
            Genres Management
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Manage book categories and sub-categories
          </Typography>
        </Box>
        <Button icon={<AddIcon />} title="Add Genre" handleClick={handleAdd} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          searchTerm={searchInput}
          setSearchTerm={setSearchInput}
          handleClearSearch={handleClearSearch}
          placeholderTitle="Search genres by name or code"
        />
      </Box>

      <GenreState
        getRootGenres={getRootGenres}
        totalElements={paginatedGenres?.totalElements || 0}
        genres={genres}
      />

      <DataTable
        columns={columns}
        data={paginatedGenres?.content || []}
        loading={loading}
        actions
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}

        page={page - 1}
        rowPerPage={rowsPerPage}
        totalRow={paginatedGenres?.totalElements || 0} // update
        onPageChange={(e, newPage) => {
          setPage(newPage + 1);
        }}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
        }}
      />

      {/* Delete mode menu */}
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleChooseDeleteMode(false)}>
          Deactivate (soft delete)
        </MenuItem>
        <MenuItem
          onClick={() => handleChooseDeleteMode(true)}
          sx={{ color: "error.main" }}
        >
          Permanently delete
        </MenuItem>
      </Menu>

      {/* Confirm modal — only used for hard delete */}
      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={handleConfirmClose}
        onConfirm={() => confirmHardDelete(true)}
        title={`Permanently delete "${selectedGenre?.name || ""}"?`}
        description="This will permanently remove the genre and cannot be undone."
        confirmText="Delete permanently"
        loading={actionLoading}
      />

      {/* Add/Edit Dialog */}
      <GenreForm
        dialogOpen={openDialog}
        handleCloseDialog={handleCloseDialog}
        editingGenres={editingGenre}
        viewGenre={viewGenre}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        getRootGenres={getRootGenres}
      />
    </Box>
  );
};

export default AdminGenrePage;
