import { fetchUser } from '../lib/fetch';
import { UserClient } from './UserClient';

type Props = {
    children?: React.ReactNode;
};

export const User = async ({ children }: Props) => {
    const user = await fetchUser();

    return <UserClient passUser={user}>{children}</UserClient>;
};
