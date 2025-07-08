'use client'

import LandingPage from '../Components/LandingPage';

export default function Page() {
  const handleSignUp = () => {
    alert('Signup clicked! (Demo mode)');
  };

  const handleSignIn = () => {
    alert('Sign in clicked! (Demo mode)');
  };

  return (
    <LandingPage 
      onSignUp={handleSignUp}
      onSignIn={handleSignIn}
    />
  );
}