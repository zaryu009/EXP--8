const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const User = require("../models/User");

const dataDirectory = path.join(__dirname, "..", "data");
const usersFilePath = path.join(dataDirectory, "users.json");
const reservedAdminEmail = (
  process.env.ADMIN_EMAIL || "aditya123@example.com"
).toLowerCase();
const reservedAdminPasswordHash =
  process.env.ADMIN_PASSWORD_HASH ||
  "$2a$10$Y9578bmQRUd6MS9zdJtIwuHoxV9UEiPnHWB0awuCe3Eng5GdJpSbu";
const reservedAdminName = process.env.ADMIN_NAME || "Admin Sir";

let storageMode = "file";

const sanitizeRecord = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  password: user.password,
  role: user.role,
  createdAt: user.createdAt,
});

const ensureFileStore = async () => {
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    await fs.access(usersFilePath);
  } catch (error) {
    await fs.writeFile(usersFilePath, "[]", "utf8");
  }
};

const readUsers = async () => {
  await ensureFileStore();
  const content = await fs.readFile(usersFilePath, "utf8");

  try {
    const users = JSON.parse(content);
    return Array.isArray(users) ? users : [];
  } catch (error) {
    return [];
  }
};

const writeUsers = async (users) => {
  await ensureFileStore();
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf8");
};

const buildReservedAdminRecord = () =>
  sanitizeRecord({
    _id: crypto.randomUUID(),
    name: reservedAdminName,
    email: reservedAdminEmail,
    password: reservedAdminPasswordHash,
    role: "admin",
    createdAt: new Date().toISOString(),
  });

const ensureReservedAdminInFileStore = async () => {
  const users = await readUsers();
  const existingAdminIndex = users.findIndex(
    (user) => user.email?.toLowerCase() === reservedAdminEmail
  );

  if (existingAdminIndex === -1) {
    users.unshift(buildReservedAdminRecord());
    await writeUsers(users);
    return;
  }

  users[existingAdminIndex] = sanitizeRecord({
    ...users[existingAdminIndex],
    name: reservedAdminName,
    email: reservedAdminEmail,
    password: reservedAdminPasswordHash,
    role: "admin",
  });

  await writeUsers(users);
};

const ensureReservedAdminInMongo = async () => {
  await User.findOneAndUpdate(
    { email: reservedAdminEmail },
    {
      name: reservedAdminName,
      email: reservedAdminEmail,
      password: reservedAdminPasswordHash,
      role: "admin",
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );
};

const initializeUserStore = async (mongoUri) => {
  if (!mongoUri) {
    storageMode = "file";
    await ensureFileStore();
    await ensureReservedAdminInFileStore();
    return {
      mode: storageMode,
      message: "No MongoDB URI found. Using local file storage.",
    };
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    storageMode = "mongo";
    await ensureReservedAdminInMongo();

    return {
      mode: storageMode,
      message: "MongoDB connected successfully.",
    };
  } catch (error) {
    storageMode = "file";
    await ensureFileStore();
    await ensureReservedAdminInFileStore();

    return {
      mode: storageMode,
      message: `MongoDB unavailable (${error.message}). Using local file storage instead.`,
    };
  }
};

const findUserByEmail = async (email) => {
  if (storageMode === "mongo") {
    return User.findOne({ email });
  }

  const users = await readUsers();
  return users.find((user) => user.email === email) || null;
};

const createUser = async ({ name, email, password, role }) => {
  if (storageMode === "mongo") {
    return User.create({ name, email, password, role });
  }

  const users = await readUsers();
  const user = sanitizeRecord({
    _id: crypto.randomUUID(),
    name,
    email,
    password,
    role,
    createdAt: new Date().toISOString(),
  });

  users.push(user);
  await writeUsers(users);

  return user;
};

const findUserById = async (id) => {
  if (storageMode === "mongo") {
    return User.findById(id).select("-password");
  }

  const users = await readUsers();
  const user = users.find((entry) => entry._id === id);

  if (!user) {
    return null;
  }

  const { password, ...safeUser } = user;
  return safeUser;
};

const listUsers = async () => {
  if (storageMode === "mongo") {
    return User.find().select("-password").sort({ createdAt: -1 });
  }

  const users = await readUsers();

  return users
    .map(({ password, ...user }) => user)
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
};

const getStorageMode = () => storageMode;

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getStorageMode,
  initializeUserStore,
  listUsers,
};
