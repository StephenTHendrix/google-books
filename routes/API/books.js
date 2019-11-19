const router = require("express").Router();
const booksController = require("../../controller/booksController");

// Matches with "/api/books"
router.route("/")
.get(booksController.findAll)
.post(booksController.create);
// .get(function (req ,res) {
//     res.json(testobject);      
//   })

//   .get(booksController.findAll)
//   .post(booksController.create);

// Matches with "/api/books/:title"
// router
//   .route("/book1");
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
