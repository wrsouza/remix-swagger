export interface IGuard {
  validate(request: Request): Promise<void>;
}
