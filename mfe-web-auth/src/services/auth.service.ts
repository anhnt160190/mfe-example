const mockUsers = [
  {
    id: '1',
    email: 'superadmin@gmail.com',
    password: 'password',
    name: 'Super Admin',
    permissions: ['read', 'write', 'update', 'delete'],
  },
  {
    id: '2',
    email: 'admin@gmail.com',
    password: 'password',
    name: 'Admin',
    permissions: ['read', 'write', 'update'],
  },
];

export const login = async (email: string, password: string) => {
  const user = mockUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const token = `${user.id}***${user.email}`;
  localStorage.setItem('access_token', token);
  return token;
};

export const logout = async () => {
  return true;
};

export const getUser = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return null;
  }

  const [userId, email] = token.split('***');
  const user = mockUsers.find(
    (user) => user.id === userId && user.email === email
  );
  return user;
};
