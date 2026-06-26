import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Landing from './pages/Landing';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/Dashboard';
import Auth from './pages/Auth';
import PlaceholderView from './pages/PlaceholderView';

export default function App() {
  return (
    <>
      <Toaster theme="dark" position="bottom-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="*" element={<PlaceholderView />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
