import express from 'express';
import TransactionModel from '../models/Transactions.js';
import AddcustomerModel from '../models/AddCustomer.js';
import i18next from 'i18next';

const router = express.Router();

router.post('/addtransaction', async(req, res) => {
    console.log("Add Transaction API is called"); 
    const {t} = req; 
        const {
          customerName,
          balance,
          withdraw,
          deposit,
          transactionDate,
          accountNum,
          accountStatus,       
        } = req.body;    
        console.log(req.body);

        try {
        const user = await AddcustomerModel.findOne({ accountNum: accountNum });
        console.log("Customer found:", user);

        if (!user) {
          return res.json({ status: false, field: "accountNum", msg: t('UNKNOWN_CUSTOMER') });
        }
        console.log("user is", user);

        if (user.customerName.toLowerCase() !== customerName.toLowerCase()) {
          return res.json({ status: false, field: "customerName", msg: t('CUSTOMER_NAME_WRONG') });
      }

      if (user.accountStatus !== accountStatus) {
          return res.json({ status: false, field: "accountStatus", msg: t('ACCOUNT_STATUS_WRONG') });
      }
        const newTransaction = new TransactionModel({
          customerName,
          balance,
          withdraw,
          deposit,
          transactionDate,
          accountNum,
          accountStatus,
          profileImage: user.profileImage
          
        });
        console.log(newTransaction);

         const newTotalTransaction = await newTransaction.save();  
         console.log("new transaction is", newTotalTransaction);  

        return res.json({ status: true, msg: t('REGISTERED_SUCCESSFULLY') , newTotalTransaction});
      } catch (error) {
        console.error("Error in addtransaction API:", error);
        return res
          .status(500)
          .json({ status: false, msg: t('INTERNAL_SERVER_ERROR') });
      }
})

router.get('/alltransactionview', async(req, res) => {
  console.log("All transaction view API is called");
  const {t} = req; 
  try {
    const alltransaction = await TransactionModel.find();
        // console.log(alltransaction);
        return res.status(200).json({msg: t('ACCESS_SUCCESSFULLY') ,alltransaction:alltransaction})
  } catch (error) {
    console.log(error);
  }
})

router.put("/edittransaction/:id",async (req, res) => {
  console.log("edit transaction API called");
  const {t} = req; 
  const id = req.params.id
  console.log("id is", id);

  const {
    customerName,
    accountNum,
    balance,
    withdraw,
    deposit,
    transactionDate,
    accountStatus
  } = req.body;
  console.log("req. body is:",req.body);

  try {
    const isExistCustomer = await AddcustomerModel.findOne({ accountNum: accountNum });

    if (!isExistCustomer) {
      return res.status(404).json({ status: false, field: "accountNum", msg: t('UNKNOWN_CUSTOMER') });
    }
    console.log("isexists customer is", isExistCustomer);

    if (isExistCustomer.customerName.toLowerCase() !== customerName.toLowerCase()) {
      return res.status(404).json({ status: false, field: "customerName", msg: t('ACCOUNT_STATUS_WRONG') });
    }

    if (isExistCustomer.accountStatus !== accountStatus) {
      return res.status(404).json({ status: false, field: "customerStatus", msg: t('ACCOUNT_STATUS_WRONG') });
    }

    let newObj = {
      customerName,
      accountNum,
      balance,
      withdraw,
      deposit,
      transactionDate,
      accountStatus,
      
    };
   console.log("new updated obj",newObj);

    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      {_id: id},
      {$set: newObj},
      {new: true}
    )
    console.log(updatedTransaction);
    return res.status(200).json({status:true,msg: t('DATA_UPDATED') ,updatedTransaction})
      } catch (error) {
    console.log("err",error);
  }

});

router.delete('/deletetransaction/:id', async(req,res) => {
  console.log("Delete API is called");
  const {t} = req; 
  const id = req.params.id;
  console.log("id is", id);

  try {
    console.log(`Deleting customer with ID: ${id}`);
      const deletedTransaction = await TransactionModel.findByIdAndDelete({_id:id});
      if (!deletedTransaction) {
          return res.status(404).json({msg: ('UNKNOWN_CUSTOMER') });
      }
      return res.status(200).json({msg: t('DELETED_SUCCESSFULLY') , deletedTransaction});
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg: t('INTERNAL_SERVER_ERROR') })
  }
})

export {router as TransactionRouter}