module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    const router = require("express").Router();

    //Create a new tutorials
    router.post("/", tutorials.create);

    //Retrive all tutorials
    router.get("/", tutorials.findAll);

    //Find all published=true tutorials
    router.get("/published", tutorials.findAllPublished);
    
    //Retrive one tutorial
    router.get("/:id", tutorials.findOne);

    //Update a tutorial
    router.put("/:id", tutorials.update);

    //Delete a tutorial
    router.delete("/:id", tutorials.delete);

    //Delete all tutorials
    router.delete("/", tutorials.deleteAll);

    app.use("/api/tutorials", router);
}