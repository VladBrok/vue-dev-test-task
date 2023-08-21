export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth();

  if (to.path === "/auth" && auth.loggedIn) {
    return navigateTo("/");
  }

  if ((to.path === "/" || to.path === "/dashboard") && !auth.loggedIn) {
    return navigateTo("/auth");
  }
});
