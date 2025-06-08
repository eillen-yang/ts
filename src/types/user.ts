export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export type EditableUser = Partial<Pick<User, "name" | "email" | "phone">>;

export type NewUser = Omit<User, "id">;

export type Role = "admin" | "editor" | "viewer";

export type UserRoleMap = Record<number, Role>;

export type StrictUserInput = Required<NewUser>;
