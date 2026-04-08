// app/index.js
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { InteractionManager } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // ensure root layout is fully mounted before navigating
    InteractionManager.runAfterInteractions(() => {
      router.replace("/(auth)/LoginScreen");
    });
  }, []);

  return null; // nothing to show on the root page
}
