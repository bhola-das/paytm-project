// // backend/routes/account.js
// const express = require('express');
// const { authMiddleware } = require('../middleware');
// const { Account,Transaction } = require('../db');
// const { default: mongoose } = require('mongoose');


// const router = express.Router();

// router.get("/balance", authMiddleware, async (req, res) => {
//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     res.json({
//         balance: account.balance
//     })
// });

// router.post("/transfer", authMiddleware, async (req, res) => {
//     const session = await mongoose.startSession();

//     session.startTransaction();
//     const { amount, to } = req.body;

//     // Fetch the accounts within the transaction
//     const account = await Account.findOne({ userId: req.userId }).session(session);

//     if (!account || account.balance < amount) {
//         await session.abortTransaction();
//         return res.status(400).json({
//             message: "Insufficient balance"
//         });
//     }

//     const toAccount = await Account.findOne({ userId: to }).session(session);

//     if (!toAccount) {
//         await session.abortTransaction();
//         return res.status(400).json({
//             message: "Invalid account"
//         });
//     }

//     // Perform the transfer
//     await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//     await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//     // Commit the transaction
//     await session.commitTransaction();
//     res.json({
//         message: "Transfer successful"
//     });
// });


// // deposit in your account
// router.post("/deposit", authMiddleware, async (req, res) => {
//     const { amount } = req.body;

//     if (amount <= 0) {
//         return res.status(400).json({
//             message: "Amount must be greater than zero"
//         });
//     }

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const account = await Account.findOne({ userId: req.userId }).session(session);

//         if (!account) {
//             await session.abortTransaction();
//             return res.status(400).json({
//                 message: "Account not found"
//             });
//         }

//         await Account.updateOne({ userId: req.userId }, { $inc: { balance: amount } }).session(session);

//         await session.commitTransaction();
//         res.json({
//             message: "Deposit successful"
//         });
//     } catch (error) {
//         await session.abortTransaction();
//         res.status(500).json({
//             message: "An error occurred during the transaction"
//         });
//     } finally {
//         session.endSession();
//     }
// });

// router.get("/transactions", authMiddleware, async (req, res) => {
//     try {
//       const txns = await Transaction.find({ userId: req.userId })
//         .sort({ timestamp: -1 })
//         .limit(20)
//         .populate("to", "firstName lastName");
  
//       res.json({ transactions: txns });
//     } catch (error) {
//       res.status(500).json({ message: "Failed to fetch transactions" });
//     }
//   });
  

// module.exports = router;

const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, Transaction } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

// Get balance
router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });

    res.json({
        balance: account.balance
    });
});

// Transfer money
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;

    try {
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid account" });
        }

        // Perform transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Log transfer transaction
        await Transaction.create([{
            userId: req.userId,
            type: "transfer",
            amount,
            to
        }], { session });

        await session.commitTransaction();
        res.json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "An error occurred during transfer" });
    } finally {
        session.endSession();
    }
});

// Deposit money
router.post("/deposit", authMiddleware, async (req, res) => {
    const { amount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater than zero" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Account not found" });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: amount } }).session(session);

        // Log deposit transaction
        await Transaction.create([{
            userId: req.userId,
            type: "deposit",
            amount
        }], { session });

        await session.commitTransaction();
        res.json({ message: "Deposit successful" });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "An error occurred during the transaction" });
    } finally {
        session.endSession();
    }
});

// Get transaction history
router.get("/transactions", authMiddleware, async (req, res) => {
    try {
        const txns = await Transaction.find({ userId: req.userId })
            .sort({ timestamp: -1 })
            .limit(20)
            .populate("to", "firstName lastName");

        res.json({ transactions: txns });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
});

module.exports = router;
