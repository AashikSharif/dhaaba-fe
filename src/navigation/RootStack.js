import isEmpty from 'lodash/isEmpty';

import { AuthStack } from './auth/AuthStack';

import Loading from '~/components/Loading';
import AppBottomTabs from '~/navigation/app/AppBottomTabs';
import { useUserStore } from '~/store/user.store';

const RootStack = () => {
  const { user } = useUserStore();

  const getStack = () => {
    if (!user?.uid) return <AuthStack />;
    if (isEmpty(user)) {
      return <Loading />;
    }

    return <AppBottomTabs />;
  };

  return getStack();
};

export default RootStack;
