export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth();

  if (to.path === "/auth" && auth.loggedIn) {
    return navigateTo("/");
  }

  if (
    (to.path === "/" ||
      to.path === "/dashboard" ||
      to.path === "/add-patient") &&
    !auth.loggedIn
  ) {
    return navigateTo("/auth");
  }
});
