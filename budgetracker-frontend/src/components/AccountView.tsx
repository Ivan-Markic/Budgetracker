import { ReactNode } from "react";

interface AccountViewProps {
  chart: ReactNode;
  transactions: ReactNode;
}

function AccountView({ chart, transactions }: AccountViewProps) {
  
  return (
    <div>
      {chart}
      {transactions}
    </div>
  );
}

export default AccountView;
