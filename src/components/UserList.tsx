import React, { useState } from "react";

// 定義嚴謹的介面，確保 TS 不會噴紅字
interface User {
  id: number;
  name: string;
  role: "Admin" | "User" | "Guest";
}

interface UserListProps {
  title: string;
}

const UserList: React.FC<UserListProps> = ({ title }) => {
  const [users] = useState<User[]>([
    { id: 1, name: "小明", role: "Admin" },
    { id: 2, name: "小華", role: "User" },
    { id: 3, name: "小美", role: "Guest" },
  ]);
  const [toggle, setToggle] = useState(false);

  // 【效能地雷】語法完全正確，Lint 會過。
  // 但這個 filter 在每次 setToggle 時都會重新跑，AI 應該會建議你用 useMemo。
  const admins = users.filter((u) => {
    console.log("正在執行複雜的過濾邏輯...");
    return u.role === "Admin";
  });

  return (
    <div className="user-list-container">
      <h2>{title}</h2>
      <button onClick={() => setToggle(!toggle)}>
        切換狀態 (目前: {toggle ? "開" : "關"})
      </button>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>
            {admin.name} - {admin.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
