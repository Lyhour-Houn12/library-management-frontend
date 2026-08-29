import { useState } from "react";

/**
 * Reusable hook for "delete with menu + confirm modal" flows.
 *
 * @param {Function} deleteAction - async fn(item, hard) => Promise
 *   (usually your dispatch(...).unwrap() call)
 * @param {Object} options
 * @param {Function} options.onSuccess - called after a successful delete
 * @param {Function} options.getSuccessMessage - (hard) => string
 * @param {Boolean} options.confirmSoftDelete - if true, also confirm soft deletes
 */
export const useDeleteWithConfirm = (
  deleteAction,
  { onSuccess, getSuccessMessage, confirmSoftDelete = false } = {},
) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingHard, setPendingHard] = useState(false);
  const [loading, setLoading] = useState(false);

  const openMenu = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const closeMenu = () => setAnchorEl(null);

  const chooseMode = (hard) => {
    setPendingHard(hard);
    setAnchorEl(null);

    if (hard || confirmSoftDelete) {
      setConfirmOpen(true);
    } else {
      runDelete(false);
    }
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setSelectedItem(null);
  };

  const runDelete = async (hard) => {
    if (!selectedItem) return;

    setLoading(true);
    try {
      await deleteAction(selectedItem, hard);
      onSuccess?.(getSuccessMessage?.(hard) ?? "Deleted successfully");
    } catch (err) {
      onSuccess?.(null, err); // let caller decide how to show errors, see usage below
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setSelectedItem(null);
    }
  };

  return {
    anchorEl,
    menuOpen: Boolean(anchorEl),
    selectedItem,
    confirmOpen,
    pendingHard,
    loading,
    openMenu,
    closeMenu,
    chooseMode,
    closeConfirm,
    confirmHardDelete: () => runDelete(true),
  };
};
