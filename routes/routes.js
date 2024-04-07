const {Router}=require('express')
const UserMiddleware=require('../middlewares/usersmiddleware')
const userController=require('../controllers/usercontroller')
const router=new Router()
router.post("/api/create",userController.Create)
router.get("/api/login", userController.Login);
router.patch('/api/update',UserMiddleware.UserMiddleware,userController.Update)
router.delete(
  "/api/delete",
  UserMiddleware.UserMiddleware,
  userController.Delete
);
module.exports=router