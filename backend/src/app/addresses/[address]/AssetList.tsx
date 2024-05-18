"use client";
import { AddressDetail } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FormattedDecimal } from "@/components/FormattedDecimal";
import { getSplitText } from "@/hooks/useShortText";
import { HelpCircle } from "iconoir-react";
import { MdMoneyOff } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface IProps {
  addressDetail: AddressDetail;
}

export function AssetList({ addressDetail }: IProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {addressDetail.assets.map(asset => (
              <TableRow key={asset.symbol || asset.ibcToken}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Avatar>
                        <AvatarImage src={asset.logoUrl} alt={asset.symbol} />
                        <AvatarFallback>
                          <MdMoneyOff />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {asset.symbol || "Unknown"}
                        {asset.description && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle style={{ marginLeft: "4px", fontSize: "15px" }} />
                            </TooltipTrigger>
                            <TooltipContent>{asset.description}</TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      {asset.ibcToken && (
                        <div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <small>{getSplitText(asset.ibcToken, 10, 10)}</small>
                            </TooltipTrigger>
                            <TooltipContent>{asset.ibcToken}</TooltipContent>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <FormattedDecimal value={asset.amount} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
