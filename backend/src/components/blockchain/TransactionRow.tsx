"use client";
import { AKTAmount } from "@/components/AKTAmount";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { useFriendlyMessageType } from "@/hooks/useFriendlyMessageType";
import { getSplitText } from "@/hooks/useShortText";
import { UrlService } from "@/lib/urlUtils";
import { BlockTransaction } from "@/types";
import Link from "next/link";
import { FormattedRelativeTime } from "react-intl";

type Props = {
  errors?: string;
  isSimple?: boolean;
  blockHeight: number;
  transaction: BlockTransaction;
};

export const TransactionRow: React.FunctionComponent<Props> = ({ transaction, blockHeight, isSimple }) => {
  const txHash = transaction.hash;
  const firstMessageType = transaction.messages[0].isReceiver ? "Receive" : useFriendlyMessageType(transaction.messages[0].type);

  return (
    <TableRow>
      <TableCell>
          {txHash}
      </TableCell>
      <TableCell align="center">
        <Badge className="h-4 max-w-[120px] bg-primary">
          <span className="truncate">{firstMessageType}</span>
        </Badge>
        <span className="text-xs">{transaction.messages.length > 1 ? " +" + (transaction.messages.length - 1) : ""}</span>
      </TableCell>
      {!isSimple && (
        <>
          <TableCell align="center">{transaction.messages[0].amount && <AKTAmount uakt={transaction.messages[0].amount} showAKTLabel />}</TableCell>
          <TableCell align="center">
            <AKTAmount uakt={transaction.fee} showAKTLabel />
          </TableCell>
        </>
      )}
      <TableCell align="center">
{blockHeight}
      </TableCell>
      <TableCell align="center">
        <span className="text-sm whitespace-nowrap">
          <FormattedRelativeTime
            value={(new Date(transaction.datetime).getTime() - new Date().getTime()) / 1000}
            numeric="auto"
            unit="second"
            style="short"
            updateIntervalInSeconds={7}
          />
        </span>
      </TableCell>
    </TableRow>
  );
};
