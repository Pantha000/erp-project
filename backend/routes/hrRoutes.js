const express = require("express");
const router = express.Router();

const {
  adminCreate,
  managerCreate,
  clientCreate,
  deleteManager,
  deleteClient,
  projectCreate,
  getAllProject,
  getProject,
  getAllManager,
  getAllClient,
  createSubadmin,
  getSingleClient,
  updateClient,
  getSingleManager,
  updateManager,
  getProjectManager,
  getProjectClient,
  paymentCreate,
  getAdminNotification,
  getManagerNotification,
  getClientNotification,
  updatePassword,
  updateProfile,
  updateAvatar,
  resignManager,
  resignClient,
  assignManager,
  assignClient,
  createAttendence,
  getAttendence,
} = require("../controllers/hrControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  meterialExpensesGenaratePdf,
  getMeterialPdf,
  labourExpensesGenaratePdf,
} = require("../controllers/generatePdf");

router.route("/admin/create").post(adminCreate);
router.route("/subadmin/create").post(createSubadmin);
router
  .route("/manager/create")
  .post(isAuthenticatedUser, authorizeRoles("Hr"), managerCreate);
router
  .route("/get/manager")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getAllManager);
router
  .route("/manager/:id")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getSingleManager);
router
  .route("/manager/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("Hr"), updateManager);
router
  .route("/manager/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("Hr"), deleteManager);
router
  .route("/client/create")
  .post(isAuthenticatedUser, authorizeRoles("Hr"), clientCreate);

router
  .route("/get/client")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getAllClient);
router
  .route("/client/:id")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getSingleClient);
router
  .route("/client/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("Hr"), updateClient);
router
  .route("/client/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("Hr"), deleteClient);

router
  .route("/project/create")
  .post(isAuthenticatedUser, authorizeRoles("Hr"), projectCreate);
router
  .route("/get/project")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getAllProject);
router
  .route("/get/project/:id")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getProject);

router
  .route("/project/manager")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getProjectManager);

router
  .route("/project/client")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getProjectClient);

router
  .route("/payment/create")
  .post(isAuthenticatedUser, authorizeRoles("Hr"), paymentCreate);

router
  .route("/admin/notification")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getAdminNotification);
router
  .route("/maneger/notification")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getManagerNotification);
router
  .route("/get/client/notification")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getClientNotification);

router
  .route("/meterial/genarate/pdf/:id")
  .post(isAuthenticatedUser, authorizeRoles("Hr"), meterialExpensesGenaratePdf);

router
  .route("/labour/genarate/pdf/:id")
  .post(isAuthenticatedUser, authorizeRoles("Hr"), labourExpensesGenaratePdf);

router
  .route("/subadmin/password/update")
  .put(isAuthenticatedUser, authorizeRoles("Hr"), updatePassword);

router
  .route("/subadmin/profile/update")
  .put(isAuthenticatedUser, authorizeRoles("Hr"), updateProfile);
router
  .route("/subadmin/avatar/update")
  .put(isAuthenticatedUser, authorizeRoles("Hr"), updateAvatar);

router
  .route("/manager/resign/:id")
  .put(isAuthenticatedUser, authorizeRoles("Hr"), resignManager);
router
  .route("/manager/assign/:id")
  .put(isAuthenticatedUser, authorizeRoles("Hr"), assignManager);
router
  .route("/client/resign/:id")
  .put(isAuthenticatedUser, authorizeRoles("Hr"), resignClient);

router
  .route("/client/assign/:id")
  .put(isAuthenticatedUser, authorizeRoles("Hr"), assignClient);

router
  .route("/create/attendence")
  .post(isAuthenticatedUser, authorizeRoles("Hr"), createAttendence);
router
  .route("/get/attendence")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getAttendence);

module.exports = router;
