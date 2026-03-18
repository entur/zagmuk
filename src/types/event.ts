export interface TimetableEvent {
  action: string;
  state: string;
  date: number;
}

export interface TimetableJobEvent {
  chouetteJobId: string;
  providerId: number;
  firstEvent: number;
  endState: string;
  events: TimetableEvent[];
}
