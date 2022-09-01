import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CardReview from "../CardReview/CardReview";
import { getReviews } from "../../redux/actions/reviewsActions";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

export default function Reviews({ id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const { reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getReviews(id));
  }, [dispatch, id]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleClickOpen("paper")}>Customer reviews</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Typography
          sx={{ mt: 3, mb: 2, display: "inline", marginLeft: 3 }}
          variant="h5"
          component="div"
        >
          Options
          <Button
            sx={{ display: "inline", marginLeft: 30 }}
            onClick={handleClose}
          >
            X
          </Button>
        </Typography>

        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Grid>
              {reviews &&
                reviews?.map((item, index) => {
                  const find = item.createdAt.indexOf("T");
                  const dateBox = item.createdAt.slice(0, find);
                  return (
                    <div key={index}>
                      <CardReview
                        name={item.User.first_name}
                        date={dateBox}
                        message={item.menssageBox}
                        score={item.scoreBox}
                      />
                    </div>
                  );
                })}
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
