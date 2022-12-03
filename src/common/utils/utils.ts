import fs from "fs";
import path from "path";
import { format } from "./date";

export async function getAllFilesExport(filePath: string, callback: Function) {
  // 根据文件路径读取文件,返回读取的文件列表
  const files: string[] = fs.readdirSync(filePath);
  // 遍历文件列表
  files.map((fileName) => {
    const absFilePath: string = path.join(filePath, fileName);
    const stats: fs.Stats = fs.statSync(absFilePath);
    if (stats.isFile()) {
      const file = require(absFilePath);
      callback(file.default);
    }
    if (stats.isDirectory()) {
      getAllFilesExport(absFilePath, callback);
    }
  });
}

export function isDirectory(path: string) {
  try {
    return fs.statSync(path).isDirectory();
  } catch (error) {
    return false;
  }
}

export function isValidKey(key: string | number | symbol, object: object) {
  return key in object;
}

export function lineToHump(lineName: string) {
  if (lineName.startsWith("_")) {
    return lineName;
  }
  return lineName.replace(/\_(\w)/g, (all, letter: string) =>
    letter.toUpperCase()
  );
}

export function humpToLine(humpName: string) {
  if (typeof humpName !== "string") {
    return humpName;
  }
  return humpName.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function lineToHumpObject(obj: { [key: string]: any }) {
  let key: string;
  const element: {
    [key: string]: any;
  } = {};
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (isValidKey(key, obj)) {
        const value = obj[key];
        if (typeof key === "string" && (key as string).indexOf("_at") > -1) {
          element[lineToHump(key)] = format(value);
        } else {
          element[lineToHump(key)] = value;
        }
      }
    }
  }
  return {
    ...element,
  }; 
}
