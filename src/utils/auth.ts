export const isAuthenticated = user => !!user;

export const isAllowed = (user, allowedList) =>
allowedList.some(allowed => user.rights.includes(allowed));

export const hasRole = (user, roles) =>
  roles.some(role => user.roles.includes(role));