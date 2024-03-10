export function extractPropertyArray<T>(items: T[] | undefined, propertyName: keyof T): any[] {
    const uniqueSet = new Set<string>();
    items?.forEach((item) => {
        const propertyValue = String(item[propertyName]);
        uniqueSet.add(propertyValue);
    });
    return Array.from(uniqueSet);
}