import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="tutorial-1" />
      <Stack.Screen name="tutorial-2" />
      <Stack.Screen name="tutorial-3" />
    </Stack>
  );
}
