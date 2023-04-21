import React from "react";
//importing  css
import "./style.css";
// importing modal stuff
import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import UploadProfile from "../UploadProfile";
const SidebarModal = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className="box-modal">
            <UploadProfile setOpen={setOpen} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default SidebarModal;
