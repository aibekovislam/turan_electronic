export function extractPropertyArray<T>(items: T[] | undefined, propertyName: keyof T): any[] {
    const uniqueSet = new Set<string | string[]>();

    items?.forEach((item) => {
        if (propertyName !== "memory") {
            const propertyValue = String(item[propertyName]);
            uniqueSet.add(propertyValue);
        } else {
            const memoryValue = item[propertyName];
            if (Array.isArray(memoryValue)) {
                memoryValue.forEach((memoryItem) => {
                    uniqueSet.add(memoryItem);
                });
            } else {
                console.warn("Memory property is not an array");
            }
        }
    });

    return Array.from(uniqueSet);
}
