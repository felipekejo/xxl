import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { get, list, search } from "./controllers/products";
import { refreshToken } from "./controllers/refreshToken";
import { removeToken } from "./controllers/removeToken";
import { verifyJWT } from "./middlewares/verify-jwt";
import { profile } from "./controllers/profile";
import { listUsers } from "./controllers/listUsers";
import { verifyUserRole } from "./middlewares/verify-user-role";
import { deleteUser } from "./controllers/deleteUser";
import { createPhones } from "./controllers/createPhones";
import { listPhones } from "./controllers/listPhones";
import { addServiceToPhone } from "./controllers/addServiceToPhone";
import { listServicesByPhoneId } from "./controllers/listServicesByPhoneId";
import { createRepair } from "./controllers/createRepair";
import { changePassword } from "./controllers/changePassword";
import { generateKeyForgotPw } from "./controllers/generateKeyForgotPwUseCase";
import { resetPassword } from "./controllers/resetPassword";
import { deleteService } from "./controllers/deleteService";
import { updateService } from "./controllers/updateService";
import { grantAdminRights } from "./controllers/grantAdminRights";
import { removeAdminRights } from "./controllers/removeAdminRights";
import { checkOut } from "./controllers/checkOutSession";

// import { sendMailMethod } from "./controllers/sendMailMethod";

/**
 * Defines routes for the application.
 * @param app - The Fastify instance.
 */
export async function appRoutes(app: FastifyInstance) {
  // User routes
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.patch("/changePassword", changePassword);
  app.post("/getResetKey", generateKeyForgotPw);
  app.patch("/resetPassword", resetPassword);

  app.patch(
    "/grantAdminRights",
    { onRequest: [verifyJWT, verifyUserRole("OWNER")] },
    grantAdminRights
  );

  app.patch(
    "/removeAdminRights",
    { onRequest: [verifyJWT, verifyUserRole("OWNER")] },
    removeAdminRights
  );

  // Product routes
  app.get("/products", list);
  app.get("/products/:id", get);
  app.get("/products/search/:label", search);

  // Token routes
  app.post("/refresh", refreshToken);
  app.get("/logout", removeToken);

  // Protected route
  app.get("/profile", { onRequest: [verifyJWT] }, profile);
  app.delete("/deleteUser", deleteUser);

  app.get(
    "/listUsers",
    { onRequest: [verifyJWT, verifyUserRole("ADMIN")] },
    listUsers
  );

  // Create Phone route
  app.get("/phones", listPhones);
  app.post("/phones", createPhones);

  // Add Service to Phone route
  app.post("/addService", addServiceToPhone);

  // List Services by Phone ID route
  app.get("/services/:phoneId", listServicesByPhoneId);
  app.patch("/services/:serviceId", updateService);
  app.delete("/service/:phoneId/:serviceId", deleteService);

  // Create Repair route
  app.post("/repairs", createRepair);

  // app.post("/send", sendMailMethod);

  app.post("/session-checkout", checkOut);
}
