export const generateUsername = (user, role) => {
  return user.name + ", " + (role ? role.toLowerCase() : '');
};
