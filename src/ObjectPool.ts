class ObjectPool
{
    private objects: Array<IProcessable> = new Array<IProcessable>();

    get areAnyVisible()
    {
        return this.objects.filter(x => x.visible).length > 0;
    }

    add(obj: IProcessable)
    {
        if (obj === null)
        {
            throw new Error("IProcessable passed is null.");
        }

        if (this.objects.indexOf(obj) !== -1)
        {
            throw new Error("The object is already part of this pool.");
        }

        this.objects.push(obj);
    }

    remove(obj: IProcessable)
    {
        let index = this.objects.indexOf(obj);

        if (index === -1)
        {
            return;
        }

        this.objects.splice(index, 1);
    }

    forEach(predicate: (processable: IProcessable, index: number, array: IProcessable[]) => void)
    {
        this.objects.forEach(predicate);
    }

    refreshAll()
    {
        this.forEach(processable => {
            let recalculable = processable as unknown as IRecalculable;

            if (recalculable.recalculate)
            {
                recalculable.recalculate();
            }
        })
    }

    hideAll()
    {
        this.forEach(processable => {
            processable.visible = false;
        })
    }

    process()
    {
        this.forEach(processable => processable.process())
    }
}
