// export type getDatabaseRecordsRequest;
export type record = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: [object];
  last_edited_by: [object];
  cover: null;
  icon: string | null;
  parent: [object];
  archived: boolean;
  in_trash: boolean;
  is_locked: boolean;
  properties: [object];
  url: string;
  public_url: string | null;
};

export type results = record[];

export type getDatabaseRecordsResponse = {
  object: string;
  results: results;
  next_cursor: null;
  has_more: boolean;
  type: string;
  page_or_data_source: object;
  request_id: string;
};
