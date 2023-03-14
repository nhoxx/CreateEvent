export type RespType_Event = {
  eventName: string;
  date: number | undefined;
  start_time: number | undefined;
  end_time: number | undefined;
  created_at: number;
  reminds_me: boolean | undefined;
  category: string;
  notes: string | undefined;
};
