import React from 'react'
import { UserStoreImpl } from './datastores/user.store'
import { UserService } from './services/user.service';

interface IStoreContext {
    user: UserStoreImpl
}

const userService = new UserService();
const user = new UserStoreImpl(userService);

export const storeContext = React.createContext<IStoreContext>({
    user,
}) 