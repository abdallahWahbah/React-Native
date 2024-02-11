import { useContext, useState } from 'react';

import AuthContent from '../components/Auth/AuthContent';
import { createUserHTTP } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  const signupHandler = async ({email, password}) =>
  {
    setIsAuthenticating(true);
    try
    {
      const token = await createUserHTTP(email, password);
      authContext.authenticate(token);
    }
    catch(error)
    {
      Alert.alert("Authentication failed", "Please check your credentials and try again")
      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating) return <LoadingOverlay message="Creating user..."/>

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
