const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

//Create and Save a new tutorial
exports.create = (req, res) => {
    if (!req.body.title){
        res.status().send({
            message: "Content cannot be empty!"
        });
        return;
    }
    
    //create a tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    //save tutorial in database
    Tutorial.create(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error while creating tutorial."
        });
    });
};


exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// exports.findAll = (req, res) => {
//     // const title = req.query.title;
//     // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
//     Tutorial.findAll()
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };


exports.findOne = (req, res) => {
    const id = parseInt(req.params.id);

    Tutorial.findByPk(id)
    .then(data => {
        if (data) 
        {
            res.send(data);
        }
        else 
        {
            res.status(404).send({
                message: `Cannot find the tutorial id=${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retriving the tutorial id=${id}`
        });
    });
    
}

exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1)
        {
            res.send({
                message: "Tutorial was updated successfully."
            });
        }
        else 
        {
            res.status(400).send({
                message: `Cannot find the tutorial id=${id}. May be there is no tutorial with this id.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error updating the tutorial id=${id}`
        });
    });
}

// Delete by tutorial id
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id : id }
    })
    .then(num => {
        if (num == 1)
        {
            res.send({
                message: `Tutorial was deleted successfully!.`
            });
        }
        else
        {
            res.status(400).send({
                message: `Could not delete the tutorial by id=${id}. May be it is not exit in the table.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error occur while deleting tutorial."
        });
    });
};

// Delete all tutorials
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: true
    })
    .then(num => {
        res.send({
            message: `Tutorials deleted successfully!.`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error occur while deleting tutorials."
        });
    });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true }})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error while fetching tutorials."
        });
    });
}