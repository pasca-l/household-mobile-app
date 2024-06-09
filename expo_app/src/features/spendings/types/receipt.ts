import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";

export type Receipt = {
  id?: string;
  created_at: Date;
  updated_at: Date;
  category: string;
  value: number;
  purchase_date: Date;
};

export type ReceiptFirestore = {
  created_at: Timestamp;
  updated_at: Timestamp;
  category: string;
  value: number;
  purchase_date: Timestamp;
};

export const receiptConverter = {
  toFirestore(receipt: Receipt): DocumentData {
    const data: ReceiptFirestore = {
      created_at: Timestamp.fromDate(receipt.created_at),
      updated_at: Timestamp.fromDate(receipt.updated_at),
      category: receipt.category,
      value: receipt.value,
      purchase_date: Timestamp.fromDate(receipt.purchase_date),
    };
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Receipt {
    const data: DocumentData = snapshot.data(options);
    const receipt: Receipt = {
      created_at: data.created_at.toDate(),
      updated_at: data.updated_at.toDate(),
      category: data.category,
      value: data.value,
      purchase_date: data.purchase_date.toDate(),
    };
    return receipt;
  },
};
