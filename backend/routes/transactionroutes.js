import {Router} from "express";
import { addTransaction, allTransactions, DeleteTransaction, respectiveTransaction, UpdateTransaction } from "../controllers/transactionControllers.js";
import { authenticationMiddleware, authorizationMiddleware } from "../middlewares/authmiddleware.js";
   const router=Router();

   router.route("/transactions")
   .get(authenticationMiddleware,allTransactions)
   .post(authenticationMiddleware,addTransaction);
   router.route("/transaction/:id")
   .get(authenticationMiddleware,respectiveTransaction)
   .put(authenticationMiddleware,authorizationMiddleware,UpdateTransaction)
   .delete(authenticationMiddleware,authorizationMiddleware,DeleteTransaction);

   export default router;