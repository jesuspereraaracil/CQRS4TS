export interface Message<P> {
  name: string;
  id: string;
  occurredOn: number;
  payload?: P;
}
