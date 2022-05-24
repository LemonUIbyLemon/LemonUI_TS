export interface IPredicate<T> {
    (obj: T): boolean;
}
