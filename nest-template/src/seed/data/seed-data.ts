import * as bcrypt from 'bcrypt';

interface SeedUser {
  email: string;
  password: string;
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test1@google.com',
      password: bcrypt.hashSync('Abc123$', 10),
    },
    {
      email: 'test2@google.com',
      password: bcrypt.hashSync('Abc123$', 10),
    },
  ],
};
