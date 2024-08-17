import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";

export type Note = {
  id?: string;
  created_at: Date;
  updated_at: Date;
  label: string;
  url: string;
  username: string;
  password: string;
};

export type NoteFirestore = {
  created_at: Timestamp;
  updated_at: Timestamp;
  label: string;
  url: string;
  username: string;
  password: string;
};

export const noteConverter = {
  toFirestore(note: Note): DocumentData {
    const data: NoteFirestore = {
      created_at: Timestamp.fromDate(note.created_at),
      updated_at: Timestamp.fromDate(note.updated_at),
      label: note.label,
      url: note.url,
      username: note.username,
      password: note.password,
    };
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Note {
    const data: DocumentData = snapshot.data(options);
    const note: Note = {
      created_at: data.created_at.toDate(),
      updated_at: data.updated_at.toDate(),
      label: data.label,
      url: data.url,
      username: data.username,
      password: data.password,
    };
    return note;
  },
};
