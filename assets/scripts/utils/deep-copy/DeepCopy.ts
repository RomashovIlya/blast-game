export abstract class DeepCopy {
  // INTERFACE
  public static clone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data)) as T
  }
}
