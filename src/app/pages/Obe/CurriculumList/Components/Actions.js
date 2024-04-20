import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCurriculum } from "app/api";
import Swal from "sweetalert2";

const Actions = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { major } = useParams();
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This process will delete all data related to this Curriculum. You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        curriculumMutation.mutate(row.id);
      }
    });
  };

  const curriculumMutation = useMutation({
    mutationFn: deleteCurriculum,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["curriculum", major],
      });
      Swal.fire({
        title: "Berhasil",
        text: "Berhasil menghapus kurikulum",
        icon: "success",
        confirmButtonText: "Oke",
      });
      handleCloseMenu();
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal",
        text: error.response.data.message ?? error.message,
        icon: "error",
        confirmButtonText: "Oke",
      });
    },
  });
  return (
    <>
      <IconButton aria-label="delete" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        className="*:!shadow-sm"
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => navigate(`/obe/curriculum/${major}/${row.id}`)}
        >
          Lihat Mata Kuliah
        </MenuItem>
        <hr />
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Actions;
