const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  const reservedAdminEmail = (
    process.env.ADMIN_EMAIL || "aditya123@example.com"
  ).toLowerCase();

  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required.",
    });
  }

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      message: "You do not have permission to access this resource.",
    });
  }

  if (
    allowedRoles.includes("admin") &&
    req.user.email?.toLowerCase() !== reservedAdminEmail
  ) {
    return res.status(403).json({
      message: "Only the reserved admin account can access this resource.",
    });
  }

  next();
};

module.exports = authorizeRoles;
