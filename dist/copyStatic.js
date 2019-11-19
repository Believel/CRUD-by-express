"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shell = __importStar(require("shelljs"));
// 拷贝public文件夹到dist目录下
shell.cp('-R', 'public', 'dist');
shell.cp('-R', 'views', 'dist');
