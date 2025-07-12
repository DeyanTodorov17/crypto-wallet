export type WebHookPayload = {
  userId: string;
  amount: string;
  txHash: string;
  from: string;
  confirmations: number;
};
