import React, { createContext, Dispatch, SetStateAction } from 'react';

interface IUserContext {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<IUserContext>({
  user: '',
  setUser: () => {},
});
