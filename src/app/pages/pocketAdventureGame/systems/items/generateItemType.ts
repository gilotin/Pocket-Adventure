import { generateRandomNumber } from "./generateRandomNumber";
import { EQUIPMENT_TYPES } from "./itemTable";

export default function generateItemType() {
    const minIndex = 1;
    const maxIndex = EQUIPMENT_TYPES.length;
    const indexCalibration = 1;
    const itemType = EQUIPMENT_TYPES[generateRandomNumber(minIndex, maxIndex) - indexCalibration];
    return itemType;
}
