export class OrderStatusChangeEvent {
  constructor(
    public readonly orderId: number,
    public readonly newStatus: string,
  ) {}
}
