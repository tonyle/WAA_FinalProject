export const generateUsername = (user, role) => {
  return user.name + ", " + role.toLowerCase();
};
