export interface TimetableEvent {
  action: string;
  state: string;
  date: number;
}

export interface TimetableJobEvent {
  chouetteJobId: string;
  providerId: number;
  firstEvent: number;
  lastEvent: number;
  durationMillis: number;
  fileName?: string;
  username?: string;
  endState: string;
  events: TimetableEvent[];
}
