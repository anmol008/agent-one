
import { Navigate } from 'react-router-dom';

// This page just redirects to the dashboard which is the main entry point
const Index = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Index;
