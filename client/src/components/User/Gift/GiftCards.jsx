import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GiftCard from "./GiftCard";
import { Grid, Stack, Box } from "@mui/material";
import { getUserGift } from "../../../redux/actions/userActions";

export default function GiftCards() {
  const dispatch = useDispatch();
  const { gifts } = useSelector((state) => state.users);
  const { userDetail } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUserGift(userDetail.email));
    console.log(userDetail.email);
  }, [dispatch, userDetail]);

  return (
    <div className="Cards-container">
      <Stack direction="row" justifyContent="space-evenly" paddingTop={3}>
      <Box xs={4}
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: 300,
          justifyContent: 'center',
          p: 3,
                 
        },
      }}>
            {gifts?.map((box) => (
              <Grid key={box.id} item xs={3}>
            <GiftCard
              key={box.id}
              image={box.image && box.image.url}
              id={box.id}
              ranking={box.ranking}
              name={box.name}
              detail={box.detail}
              person={box.person}
              expiration_date={box.expiration_date}
              box={box}
            />
          </Grid>
        ))}
      </Box>
      </Stack>
    </div>
  );
}
