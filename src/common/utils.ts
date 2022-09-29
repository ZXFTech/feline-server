import fs from "fs";
import path from "path";

export async function getAllFilesExport(filePath: string, callback: Function) {
  // 根据文件路径读取文件,返回读取的文件列表
  const files: string[] = fs.readdirSync(filePath);
  // 遍历文件列表
  files.map((fileName) => {
    const absFilePath: string = path.join(filePath, fileName);
    const stats: fs.Stats = fs.statSync(absFilePath);
    if (stats.isFile()) {
      const file = require(absFilePath);
      callback(file);
    }
    if (stats.isDirectory()) {
      getAllFilesExport(absFilePath, callback);
    }
  });
}
