import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import NotificationToast from "@/components/NotificationToast";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SplashScreen from "./pages/SplashScreen";
import Landing from "./pages/Landing";
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/onboarding/Welcome";
import ProfileSetup from "./pages/onboarding/ProfileSetup";
import Permissions from "./pages/onboarding/Permissions";
import AccessibilitySetup from "./pages/onboarding/AccessibilitySetup";
import CommunicationPreferences from "./pages/onboarding/CommunicationPreferences";
import UserHome from "./pages/user/UserHome";
import CommunicationBoard from "./pages/user/CommunicationBoard";
import CustomPhraseBuilder from "./pages/user/CustomPhraseBuilder";
import ChatScreen from "./pages/user/ChatScreen";
import VoiceOutput from "./pages/user/VoiceOutput";
import UserTracking from "./pages/user/UserTracking";
import EmotionDashboard from "./pages/user/EmotionDashboard";
import CaregiverDashboard from "./pages/caregiver/CaregiverDashboard";
import AIAnalysis from "./pages/caregiver/AIAnalysis";
import CaregiverTracking from "./pages/caregiver/CaregiverTracking";
import AlertsScreen from "./pages/shared/AlertsScreen";
import ProfileScreen from "./pages/shared/ProfileScreen";
import SettingsScreen from "./pages/shared/SettingsScreen";
import EditProfile from "./pages/shared/EditProfile";
import EmergencyContacts from "./pages/shared/EmergencyContacts";
import ActivityTimeline from "./pages/shared/ActivityTimeline";
import EmergencyScreen from "./pages/EmergencyScreen";
import WearableSetup from "./pages/wearable/WearableSetup";
import NotFound from "./pages/NotFound";
import RealtimeNotificationInit from "./components/RealtimeNotificationInit";

const queryClient = new QueryClient();

const pageTransition = {
  initial: { opacity: 0, y: 12, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.99 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...(reduceMotion ? { initial: false } : pageTransition)} className="min-h-0">
        <Routes location={location}>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Onboarding */}
          <Route path="/onboarding/welcome" element={<Welcome />} />
          <Route path="/onboarding/profile-setup" element={<ProfileSetup />} />
          <Route path="/onboarding/permissions" element={<Permissions />} />
          <Route path="/onboarding/accessibility" element={<AccessibilitySetup />} />
          <Route path="/onboarding/communication" element={<CommunicationPreferences />} />

          {/* User Routes */}
          <Route path="/user" element={<UserHome />} />
          <Route path="/user/communicate" element={<CommunicationBoard />} />
          <Route path="/user/custom-phrases" element={<CustomPhraseBuilder />} />
          <Route path="/user/chat" element={<ChatScreen role="user" />} />
          <Route path="/user/voice" element={<VoiceOutput />} />
          <Route path="/user/tracking" element={<UserTracking />} />
          <Route path="/user/alerts" element={<AlertsScreen role="user" />} />
          <Route path="/user/profile" element={<ProfileScreen role="user" />} />
          <Route path="/user/settings" element={<SettingsScreen role="user" />} />
          <Route path="/user/edit-profile" element={<EditProfile role="user" />} />
          <Route path="/user/emergency-contacts" element={<EmergencyContacts role="user" />} />
          <Route path="/user/timeline" element={<ActivityTimeline role="user" />} />

          {/* Caregiver Routes */}
          <Route path="/caregiver" element={<CaregiverDashboard />} />
          <Route path="/caregiver/tracking" element={<CaregiverTracking />} />
          <Route path="/caregiver/analysis" element={<AIAnalysis />} />
          <Route path="/caregiver/emotions" element={<EmotionDashboard />} />
          <Route path="/caregiver/chat" element={<ChatScreen role="caregiver" />} />
          <Route path="/caregiver/alerts" element={<AlertsScreen role="caregiver" />} />
          <Route path="/caregiver/profile" element={<ProfileScreen role="caregiver" />} />
          <Route path="/caregiver/settings" element={<SettingsScreen role="caregiver" />} />
          <Route path="/caregiver/edit-profile" element={<EditProfile role="caregiver" />} />
          <Route path="/caregiver/emergency-contacts" element={<EmergencyContacts role="caregiver" />} />
          <Route path="/caregiver/timeline" element={<ActivityTimeline role="caregiver" />} />

          {/* Wearable */}
          <Route path="/wearable/setup" element={<WearableSetup />} />

          {/* Emergency */}
          <Route path="/emergency" element={<EmergencyScreen />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <NotificationToast />
          <BrowserRouter>
            <RealtimeNotificationInit />
            <AnimatedRoutes />
          </BrowserRouter>
        </NotificationProvider>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
