import express from 'express';
import StaffModel from '../models/Staff.js';
import multer from "multer";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import i18next from 'i18next';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/profiles');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post('/addstaff', upload.single('profileImage'), async (req, res) => {
    console.log("Addstaff API called");

    const {t} = req;
    if (req.file) {
      req.body.profileImage = `/uploads/profiles/${req.file.filename}`;
    }
    try {
        const {
          staffName,
          staffPosition,
          email,
          phoneNum,
          staffSalary,
          gender,
          description,
          profileImage,
        } = req.body;
    
        console.log(req.body);
    
        const user = await StaffModel.findOne({ email });
        if (user) {
          return res.json({ field: "email", msg: t('USER_ALREADY_REGISTERED') });
        }
    
        const newStaff = new StaffModel({
          staffName,
          staffPosition,
          email,
          phoneNum,
          staffSalary,
          gender,
          description,
          profileImage,
        });
        console.log(newStaff);
        await newStaff.save();
        return res.json({ status: true, msg: t('REGISTERED_SUCCESSFULLY') });
      } catch (error) {
        console.error("Error in addstaff API:", error);
        return res
          .status(500)
          .json({ status: false, msg: t('INTERNAL_SERVER_ERROR') });
      }
})

router.get('/allstaffview' , async (req, res) => {
    console.log("Allstaffview API is called");
    const {t} = req;
    try {
        const allstaff = await StaffModel.find();
        // console.log(allstaff);

        return res.status(200).json({msg: ('ACCESS_SUCCESSFULLY') ,allstaff:allstaff})
    } catch (error) {
        
    }
})

router.put("/editstaff/:id", upload.single('profileImage'), async (req, res) => {
    console.log("Edit staff API is aclled");
    const {t} = req;
    const id = req.params.id
    console.log("id is",id);

    const data = {
      ...req.body,
      profileImage: req.file ? `/uploads/profiles/${req.file.filename}` : req.body.profileImage
    };

    try {

      const existingStaff = await StaffModel.findOne({ email: data.email ,
         _id: { $ne: id }  
      });
  
      if (existingStaff) {
        if (existingStaff.email === data.email) {
          return res.status(400).json({ field: "email", msg: t('EMAIL_ALREADY_REGISTERED') });
        }
      }

        const updatedStaff = await StaffModel.findByIdAndUpdate(
            {_id: id},
            {$set: data},
            {new: true}
          )
          console.log(updatedStaff);
          return res.status(200).json({msg: t('DATA_UPDATED') ,updatedStaff }) 
    } catch (error) {
        console.log(error);
    }

})

router.delete("/deletestaff/:id", async (req, res) => { 
    console.log("Delete API is called");
    const {t} = req;
    const id = req.params.id;
  try {
      console.log(`Deleting customer with ID: ${id}`);
      const deletedStaff = await StaffModel.findByIdAndDelete({_id:id});
      if (!deletedStaff) {
          return res.status(404).json({msg: t('UNKNOWN_STAFF') });
      }
      return res.status(200).json({msg: t('DELETED_SUCCESSFULLY') , deletedStaff});
  } catch (error) {
      console.error(`Error deleting customer with ID: ${id}`, error);
      return res.status(500).json({msg: t('INTERNAL_SERVER_ERROR') });
  }
})

export {router as StaffRouter};