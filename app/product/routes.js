const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const fs = require('fs');
const path = require('path');
const connection = require('../../config/mysql');

router.get('/product', (req, res, next) => {
    connection.connect();
    connection.query({
        sql: 'SELECT * FROM product',
    }, (error, result) => {
        if(error) {
            res.send({
                status: 'failed',
                response: 'failed to fetch'
            });
        } else {
            res.send({
                status: 'success',
                response: result
            });
        }
    });
});

router.get('/product/:id', (req, res) => {
    res.json({
        id: req.params.id
    });
});

// router.post('/product/', upload.single('image'), (req, res) => {
//     const {name, price, stock, status} = req.body;
//     const image = req.file;
//     if(image) {
//         const target = path.join(__dirname, 'uploads', image.originalname);
//         fs.renameSync(image.path, target)
//         // res.json({
//         //     name,
//         //     price,
//         //     stock,
//         //     status,
//         //     image
//         // });
//         res.sendFile(target);
//     }
// });

// router.get('/:category/:tag', (req, res) => {
//     const {category, tag} = req.params;
//     res.json({category, tag})
// })

module.exports = router;