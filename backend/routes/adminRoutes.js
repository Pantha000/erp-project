const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  getRevenue,
  getAllProject,
  createDeposit,
  createWithdraw,
  allDeposit,
  allWithdraw,
  topCustomer,
  unpaidCustomer,
  totalDeposit,
  totalWithdraw,
  getMonthlyRevenue,
  deleteDeposit,
  deleteWithdraw,
  updatePassword,
  updateProfile,
  updateAvatar,
} = require("../controllers/adminControllers");

router.route("/total/revenue").get(isAuthenticatedUser, getRevenue);
router.route("/monthly/revenue").get(isAuthenticatedUser, getMonthlyRevenue);

router.route("/all/project").get(isAuthenticatedUser, getAllProject);
router
  .route("/create/deposit")
  .post(isAuthenticatedUser, authorizeRoles("Admin"), createDeposit);
router
  .route("/create/withdraw")
  .post(isAuthenticatedUser, authorizeRoles("Admin"), createWithdraw);
router
  .route("/admin/deposit")
  .get(isAuthenticatedUser, authorizeRoles("Admin"), allDeposit);

router
  .route("/admin/withdraw")
  .get(isAuthenticatedUser, authorizeRoles("Admin"), allWithdraw);
router.route("/top/customer").get(isAuthenticatedUser, topCustomer);
router.route("/top/unpaid/customer").get(isAuthenticatedUser, unpaidCustomer);
router.route("/total/deposit").get(isAuthenticatedUser, totalDeposit);
router.route("/total/withdraw").get(isAuthenticatedUser, totalWithdraw);

router
  .route("/delete/deposit/:id")
  .delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteDeposit);
router
  .route("/delete/withdraw/:id")
  .delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteWithdraw);

router
  .route("/admin/password/update")
  .put(isAuthenticatedUser, authorizeRoles("Admin"), updatePassword);

router
  .route("/admin/profile/update")
  .put(isAuthenticatedUser, authorizeRoles("Admin"), updateProfile);
router
  .route("/admin/avatar/update")
  .put(isAuthenticatedUser, authorizeRoles("Admin"), updateAvatar);

module.exports = router;
