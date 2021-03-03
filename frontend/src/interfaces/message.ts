export default interface Message {
  readonly id: string;
  readonly name: string;
  readonly body: string;
  readonly room: string;
  readonly createdAt: string;
}
