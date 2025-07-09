'use client';
import { AuthProvider, ProtectedRoute } from '../Components/AuthContext';
import AuthComponent from '../Components/Auth';
import Layout from '../Components/Layout';

export default function Home() {
  return (
    <AuthProvider>
      <ProtectedRoute fallback={<AuthComponent />}>
        <Layout />
      </ProtectedRoute>
    </AuthProvider>
  );
}
