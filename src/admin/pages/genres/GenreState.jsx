import { Grid, Paper, Typography } from "@mui/material";

const GenreState = ({ getRootGenres, totalElements, genres }) => {
  console.log("Genres: ", genres);
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Paper sx={{ p: 2, textAlign: "center", bgcolor: "background.paper" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "primary.main" }}
          >
            {getRootGenres().length}
            <Typography variant="body2">Root Genres</Typography>
          </Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <Paper sx={{ p: 2, textAlign: "center", bgcolor: "background.paper" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "success.main" }}
          >
            {totalElements}
          </Typography>
          <Typography variant="body2">Total Genres</Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <Paper sx={{ p: 2, textAlign: "center", bgcolor: "background.paper" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "secondary.main" }}
          >
            {genres?.filter((g) => g.active).length || 0}
          </Typography>
          <Typography variant="body2">Active Genres</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GenreState;
