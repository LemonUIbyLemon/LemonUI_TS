interface IContainer<T> extends IRecalculable, IProcessable
{
    add(item: T): void;
    remove(item: T): void;
    remove(predicate: IPredicate<T>): void;
    clear(): void;
    contains(item: T): void;
}
