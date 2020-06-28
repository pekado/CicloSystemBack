const express = require("express");
const router = express.Router();
const worksController = require("../controllers/worksController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
//crea proyectos
//api/Works
router.post("/", 
    // auth,
    // [
    //     check('name', "You must add a project name.").not().isEmpty()
    // ],
    worksController.createWork
 );
//obtener proyectos
 router.get("/", 
   //  auth,
    worksController.getWorks
 );
//actualizar proyecto via ID    
router.put("/:id", 
   //  auth,
   //  [
   //      check('name', "You must add a project name.").not().isEmpty()
   //  ],
    worksController.updateWork
 );

 //eliminar proyecto
 router.delete("/:id", 
    auth,
    worksController.deleteWork
 );

module.exports = router;
