const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
//crea proyectos
//api/projects
router.post("/", 
    // auth,
    // [
    //     check('name', "You must add a project name.").not().isEmpty()
    // ],
    clientController.createClient
 );
//obtener proyectos
 router.get("/", 
    // auth,
    clientController.getClients
 );
//actualizar proyecto via ID    
router.put("/:id", 
    auth,
    [
        check('name', "You must add a client name.").not().isEmpty()
    ],
    clientController.updateClient
 );

 //eliminar proyecto
 router.delete("/:id", 
    auth,
    clientController.deleteClient
 );
module.exports = router;
