import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  ErrorPageText:{
    fontFamily: "Inter",
    fontWeight: "bold",
    color: "grey",
    fontSize: "70px",
  },
}));

export const ErrorPage = ({ children, ...props }) => {
  const styles = useStyles();
  return (
    <>
      <Grid
        container
        spacing={14}
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <label className={styles.ErrorPageText}>
          404
          </label>
          <label className={styles.ErrorPageText}>
          Page Not Found
          </label>
        </Grid>
      </Grid>
    </>
  );
};
