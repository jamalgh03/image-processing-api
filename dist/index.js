"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./src/routes/images"));
const app = (0, express_1.default)();
app.use('/api/images', images_1.default);
app.get('/', (req, res) => {
    res.send('Server is running');
});
if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}
exports.default = app;
