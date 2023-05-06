export interface FUser {
  id?: number;
  username: string;
  email?: string;
  sex?: "1" | "0" | "99"; // 1 male, 0 female, 99 secret
  avatar?: string;
  level: "0" | "1"; // 0 普通用户, 1 管理员
  password: string;
}
