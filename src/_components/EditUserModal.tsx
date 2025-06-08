import React, { useState } from "react";
import type { EditableUser, User } from "../types/user";

interface EditUserModalProps {
  user: User;
  onSave: (updated: EditableUser) => void;
  onClose: () => void;
}

export default function EditUserModal({
  user,
  onSave,
  onClose,
}: EditUserModalProps) {
  const [form, setForm] = useState<EditableUser>({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-[300px] space-y-3">
        <h2 className="text-lg font-semibold">사용자 정보 수정</h2>
        <input
          className="border w-full p-1"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="border w-full p-1"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="border w-full p-1"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500">
            취소
          </button>
          <button onClick={handleSubmit} className="text-blue-600">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
