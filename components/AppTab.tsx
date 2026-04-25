"use client";;
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DataTable from "./DataTable";

export function AppTab() {
  const users = useSelector((state: RootState) => state.usersResult.users);
  const flatUsers = useMemo(() => users?.flat() ?? [], [users]);
  return (
    <div className="relative space-y-3">
      <DataTable
        data={flatUsers}
      />
    </div>
  );
}