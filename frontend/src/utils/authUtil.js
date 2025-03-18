export const generateUsername = (user, role) => {
  return user.username + ", " + role.toLowerCase();
};
