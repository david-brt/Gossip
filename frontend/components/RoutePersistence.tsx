import { useCallback, useEffect } from "react";
import { useFocusEffect, usePathname, useRouter } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { store } from "../lib/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getRoute() {
  try {
    const latestRoute = await AsyncStorage.getItem("latest-route");
    if (latestRoute === null) {
      return "/signup";
    }
    return latestRoute;
  } catch (e) {
    throw e;
  }
}

async function storeRoute(route: string): Promise<void> {
  if (route === "/") return;
  try {
    await store("latest-route", route);
  } catch (e) {
    throw e;
  }
}

const RoutePersistence = () => {
  const router = useRouter();
  const currentRoute = usePathname();
  const { data, isPending, isError } = useQuery({
    queryKey: ["latest-route"],
    queryFn: getRoute,
  });

  const mutation = useMutation({
    mutationFn: (route: string) => storeRoute(route),
  });

  useFocusEffect(
    useCallback(() => {
      mutation.mutate(currentRoute);
    }, [currentRoute]),
  );

  useEffect(() => {
    if (isPending) return;
    const route = isError ? "/signup" : data;
    router.navigate(route);
  }, [data]);
  return null;
};

export default RoutePersistence;
