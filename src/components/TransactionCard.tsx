import { ArrowDown, ArrowUp } from "lucide-react";
import clsx from "clsx";
import { toISTTime } from "@/lib/utils";
import type { WalletTransaction } from "@/lib/types";

const TransactionCard = ({ txn }: { txn: WalletTransaction }) => {
  
  const isCredit = txn.type === "CREDIT";

  return (
    <div
      key={txn.id}
      className={clsx(
        "border-l-4 rounded-md p-4 shadow-sm bg-white dark:bg-muted",
        isCredit ? "border-green-500" : "border-red-500"
      )}
    >
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-1 text-sm">
          <p className="font-medium">
            <span className="text-muted-foreground">Txn ID:</span> {txn.id}
          </p>
          <p>
            <span className="text-muted-foreground">Amount:</span> ₹{txn.amount}
          </p>
          <p>
            <span className="text-muted-foreground">Description:</span>{" "}
            {txn.description}
          </p>
        </div>

        <div className="flex items-start sm:items-end flex-col justify-between text-sm">
          <div
            className={clsx(
              "inline-flex items-center px-2 py-1 text-xs font-semibold rounded-md",
              isCredit
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {isCredit ? (
              <ArrowDown className="w-3 h-3 mr-1" />
            ) : (
              <ArrowUp className="w-3 h-3 mr-1" />
            )}
            {isCredit ? "Credit" : "Debit"}
          </div>
          <p className="text-muted-foreground text-xs mt-2">
            {toISTTime(txn.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
