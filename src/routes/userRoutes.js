import express from 'express';
import UserController from '../controller/userController';
import uploading from '../Midleware/upload';
const UserRoutes =express.Router();
UserRoutes.get("/Fetchall",(req,res)=>{
res.send("entry number 2");
});
UserRoutes.post("/register",uploading,()=>{

});
UserRoutes.post("/registeruser",uploading,UserController.excelImport);
UserRoutes.get("/exportuser",UserController.excellExport);
export default UserRoutes;