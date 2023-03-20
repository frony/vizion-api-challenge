export class ReferenceType {
  id: number;
  url: string;
  created_at: string;
}

export class ReferenceInDbType extends ReferenceType {
  updated_at: string;
}
