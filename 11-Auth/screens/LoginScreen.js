import { useContext, useState } from 'react';

import AuthContent from '../components/Auth/AuthContent';
import { loginUserHTTP } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  const loginHandler = async ({email, password}) =>
  {
    setIsAuthenticating(true);
    try
    {
      const token = await loginUserHTTP(email, password);
      authContext.authenticate(token);
    }
    catch(error)
    {
      Alert.alert("Authentication failed", "Please check your credentials and try again")
      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating) return <LoadingOverlay message="Loggin you in..."/>

  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
