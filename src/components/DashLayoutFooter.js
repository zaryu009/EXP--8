import { Box, Typography } from "@mui/material";

function DashLayoutFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        borderTop: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Secure JWT authentication with protected routes and RBAC.
      </Typography>
    </Box>
  );
}

export default DashLayoutFooter;
