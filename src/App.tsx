import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import AboutPage from "@/pages/setting";
import DeveloperPage from "@/pages/developer";

//此为前端区，前端就是标准网页应用，这个页面主要负责页面路由
interface AppSettings {
  javaVersion: string;
  javaPath: string;
  memory: string;
  resolution: string;
  gameDir: string;
  fullscreen: boolean;
  skipIntro: boolean;
  debugMode: boolean;
  autoUpdate: boolean;
  keepLoggedIn: boolean;
  minimizeToTray: boolean;
}

function App() {
  const [appSettings, setAppSettings] = useState<AppSettings>({
    javaVersion: "java17",
    javaPath: "",
    memory: "2048",
    resolution: "1920x1080",
    gameDir: "",
    fullscreen: false,
    skipIntro: true,
    debugMode: false,
    autoUpdate: true,
    keepLoggedIn: true,
    minimizeToTray: false,
  });

  const handleSettingsChange = (newSettings: AppSettings) => {
    setAppSettings(newSettings);
  };

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route
        element={
          <AboutPage
            settings={appSettings}
            onSettingsChange={handleSettingsChange}
          />
        }
        path="/setting"
      />
      <Route element={<DeveloperPage />} path="/developer" />
    </Routes>
  );
}

export default App;
