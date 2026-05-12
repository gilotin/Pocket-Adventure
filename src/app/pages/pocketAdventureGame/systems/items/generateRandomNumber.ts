export function generateRandomNumber(min: number, max: number): number {
    const quantity = Math.floor(Math.random() * (max - min + 1)) + min;

    return quantity;
}
