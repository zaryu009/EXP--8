import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function PageNotFound() {
  return (
    <Box textAlign="center" py={8}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        404
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/">
        Go Home
      </Button>
    </Box>
  );
}

export default PageNotFound;
