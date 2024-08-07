import express from "express";
import AddcustomerModel from "../models/AddCustomer.js";
import multer from "multer";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import i18next from "i18next";

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

router.post("/addcustomer", upload.single('profileImage'), async (req, res) => {

  const {t} = req;

  if (req.file) {
    req.body.profileImage = `/uploads/profiles/${req.file.filename}`;
  }
  try {
    console.log("addcustomer API called");
    const {
      customerName,
      email,
      phoneNum,
      accountNum,
      registerDate,
      accountType,
      accountStatus,
      description,
      profileImage,
    } = req.body;

    console.log(req.body);

    const existingAccountNum = await AddcustomerModel.findOne({ accountNum })
    if (existingAccountNum) {
      return res.json({ field: "accountNum", msg: t('ACCOUNT_NUMBER_REGISTERED') });
    }
    const newCustomer = new AddcustomerModel({
      customerName,
      email,
      phoneNum,
      accountNum,
      registerDate,
      accountType,
      accountStatus,
      description,
      profileImage,
    });
    console.log(newCustomer);
    await newCustomer.save();
    return res.json({ status: true, msg: t('REGISTERED_SUCCESSFULLY') });
  } catch (error) {
    console.error("Error in signup API:", error);
    return res
      .status(500)
      .json({ status: false, msg: t('INTERNAL_SERVER_ERROR') });
  }
});

router.get('/allcustomerview', async(req, res) => {
  const {t} = req;
    console.log("allcustomerview API called");
    try {
        const allcustomer = await AddcustomerModel.find();
        // console.log(allcustomer);

        return res.status(200).json({msg: t('ACCESS_SUCCESSFULLY') ,allcustomer:allcustomer})
    } catch (error) {
      console.log(error);
    }
})

router.put("/editcustomer/:id", upload.single('profileImage'), async (req, res) => {
  console.log("editcustomer API called");
  const {t} = req;
  const id = req.params.id
  console.log("id is",id);

  const data = {
    ...req.body,
    profileImage: req.file ? `/uploads/profiles/${req.file.filename}` : req.body.profileImage
  };

  try {

    const existingCustomer = await AddcustomerModel.findOne({
      $or:
       [{ accountNum: data.accountNum }
      ],
      _id: { $ne: id }  
    });

    if (existingCustomer) {
      if (existingCustomer.accountNum === data.accountNum) {
        return res.status(400).json({ field: "accountNum", msg: t('ACCOUNT_NUMBER_REGISTERED') });
      }
    }

    const updatedCustomer = await AddcustomerModel.findByIdAndUpdate(
      {_id: id},
      {$set: data},
      {new: true}
    )
    console.log(updatedCustomer);
    return res.status(200).json({msg: t('DATA_UPDATED') ,updatedCustomer })
      } catch (error) {
    console.log("err",error);
  }

});


router.delete('/deletecustomer/:id', async (req, res) => {
  console.log("delete API called");
  const {t} = req;
  const id = req.params.id;
  try {
      console.log(`Deleting customer with ID: ${id}`);

      const deletedCustomer = await AddcustomerModel.findByIdAndDelete({_id:id});
      if (!deletedCustomer) {
          return res.status(404).json({ msg: t('UNKNOWN_CUSTOMER') });
      }
      return res.status(200).json({msg: t('DELETED_SUCCESSFULLY') , deletedCustomer});
  } catch (error) {
      console.error(`Error deleting customer with ID: ${id}`, error);
      return res.status(500).json({msg: t('INTERNAL_SERVER_ERROR') });
  }
});

export { router as AddCustomerRouter };
