const mockUsers = [
  {
    id: '1',
    email: 'superadmin@gmail.com',
    password: 'password',
    name: 'Super Admin',
    avatarUrl: 'https://avatar.iran.liara.run/public',
  },
  {
    id: '2',
    email: 'admin@gmail.com',
    password: 'password',
    name: 'Admin',
    avatarUrl: 'https://avatar.iran.liara.run/public',
  },
];

export const login = async (email: string, password: string) => {
  const user = mockUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    throw new Error('Invalid credentials');
  }
  return user;
};

export const logout = async () => {
  return true;
};
