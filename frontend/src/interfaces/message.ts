export default interface Message {
  readonly id: number;
  readonly name: string;
  readonly body: string;
  readonly room: string;
}
