import React, { useState } from "react";
import type { NewUser, StrictUserInput } from "../types/user";

interface AddUserFormProps {
  onAdd: (user: NewUser) => void;
}

export default function AddUserForm({ onAdd }: AddUserFormProps) {
  // const [form, setForm] = useState<NewUser>({
  //   name: "",
  //   email: "",
  //   phone: "",
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!form.name || !form.email) return alert("이름과 이메일은 필수입니다.");

  //   onAdd(form);
  //   setForm({ name: "", email: "", phone: "" });
  // };

  const [form, setForm] = useState<StrictUserInput>({
    name: "",
    email: "",
    phone: "",
  });

  const isFormValid = (data: StrictUserInput): boolean => {
    return !!data.name && !!data.email && !!data.phone;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid(form)) {
      alert("모든 항목을 입력하세요.");
      return;
    }
    onAdd(form);
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 mb-4">
      <h2 className="font-semibold">새로운 사용자 추가</h2>
      <input
        type="text"
        value={form.name}
        onChange={handleChange}
        name="name"
        placeholder="이름"
        className="border w-full p-1"
      />
      <input
        value={form.email}
        onChange={handleChange}
        type="text"
        name="email"
        placeholder="이메일"
        className="border w-full p-1"
      />
      <input
        value={form.phone}
        onChange={handleChange}
        type="text"
        name="phone"
        placeholder="전화번호"
        className="border w-full p-1"
      />
      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">
        추가
      </button>
    </form>
  );
}
