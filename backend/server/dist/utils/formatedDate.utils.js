"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
function formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    console.log(`${year}/${month}/${day}`);
    return `${year}/${month}/${day}`;
}
exports.formatDate = formatDate;
//# sourceMappingURL=formatedDate.utils.js.map