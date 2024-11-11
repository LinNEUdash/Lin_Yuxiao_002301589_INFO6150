const express = require('express');
const multer = require('multer');
const { createUser, editUser, deleteUser, getAllUsers, uploadImage } = require('../controllers/userController');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './images'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(file.mimetype);
        extName ? cb(null, true) : cb(new Error('Only JPEG, PNG, and GIF formats are allowed'));
    }
});

router.post('/create', createUser);
router.put('/edit', editUser);
router.delete('/delete', deleteUser);
router.get('/getAll', getAllUsers);
router.post('/uploadImage', upload.single('image'), uploadImage);

module.exports = router;