import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Landing from './pages/Landing';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/Dashboard';
import Auth from './pages/Auth';
import PlaceholderView from './pages/PlaceholderView';
import Trips from './pages/Trips';
import TripDetail from './pages/TripDetail';
import SharedTrip from './pages/SharedTrip';
import Saved from './pages/Saved';
import Memories from './pages/Memories';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Toaster theme="dark" position="bottom-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/shared/:shareId" element={<SharedTrip />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="trips" element={<Trips />} />
            <Route path="trips/:id" element={<TripDetail />} />
            <Route path="saved" element={<Saved />} />
            <Route path="memories" element={<Memories />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<PlaceholderView />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
