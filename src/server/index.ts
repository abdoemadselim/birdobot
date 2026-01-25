// Libs
import { j } from "./jstack"

// Routers
import { authRouter } from "./routers/auth-router"
import { eventCategoryRouter } from "./routers/event-category-router"
import { eventRouter } from "./routers/event-router"
import { userRouter } from "./routers/user-router"
import { paymentRouter } from "./routers/payment-router"

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 * It's an instance of hono class as well, so it has all the functions a hono instance would have
 * @see https://jstack.app/docs/backend/app-router
 */
const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  // This is a JStack error handler that returns standardized error response 
  .onError(j.defaults.errorHandler)

// To customize it, the hono onError function can be used
/*
api.onError((err, c) => {
  console.error(`${err}`)
  return c.text("Custom Error Message", 500)
})
*/

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 * It's just a normal router like express routers (it passes the request to a controller)
 */
const appRouter = j.mergeRouters(api, {
  auth: authRouter,
  eventCategory: eventCategoryRouter,
  event: eventRouter,
  user: userRouter,
  payment: paymentRouter
})

export type AppRouter = typeof appRouter

export default appRouter
