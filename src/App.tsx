import { useEffect, useState } from "react";
import "./App.css";
import ListRenderer from "./_components/ListRenderer";
import { useGenericList } from "./hooks/useGenericList";
import { fetchUsers } from "./api/userApi";
import { fetchData } from "./api/fetchApi";
import { useFetch } from "./hooks/useFetch";
import UserList from "./_components/UserList";

interface User {
  id: number;
  name: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const initUser: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "mandoo" },
  { id: 3, name: "eillen" },
];

function App() {
  const numbers = [1, 2, 3];

  const {
    items: users,
    addItem,
    removeItem,
    setAll,
  } = useGenericList(initUser);

  const [nameInput, setNameInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleAdd = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;

    const newUser: User = {
      id: Date.now(),
      name: trimmed,
    };

    addItem(newUser);
    setNameInput("");
  };

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setAll(data);
        setLoading(false);
      })
      .catch(() => {
        setError("사용자 목록 불러오기 실패");
        setLoading(false);
      });
  }, []);

  // const [todos, setTodos] = useState<Todo[]>([]);
  // // todos 할일목록 가져오기 with 제네릭 함수
  // useEffect(() => {
  //   fetchData<Todo[]>("https://jsonplaceholder.typicode.com/todos").then(
  //     setTodos
  //   );
  // }, []);

  const {
    data: todos,
    loading: todoLoading,
    error: todoError,
  } = useFetch<Todo[]>("https://jsonplaceholder.typicode.com/todos");

  return (
    <div style={{ padding: "40px" }}>
      <h1 className="text-2xl font-bold">사용자 관리 대시보드</h1>
      <UserList />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">할 일 목록</h2>
        {todoLoading && <p>할일 목록 로딩중 ...</p>}
        {todoError && <p style={{ color: "red" }}>{todoError}</p>}
        {todos &&
          todos.slice(0, 10).map((todo) => (
            <div key={todo.id} className="border-b py-2">
              <input type="checkbox" checked={todo.completed} readOnly />
              {todo.id}. {todo.title}
            </div>
          ))}
      </div>

      <h2>사용자 리스트</h2>
      {error && <p>{error}</p>}
      {loading ? (
        <p>로딩중 ...</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            style={{ padding: "10px", marginRight: "10px" }}
          />
          <button onClick={handleAdd}>추가</button>
          <ListRenderer
            items={users}
            renderItem={(user) => (
              <div>
                {user.id}
                {user.name}
              </div>
            )}
            onDelete={removeItem}
          />
        </>
      )}

      <h2>숫자 리스트</h2>
      <ListRenderer
        items={numbers}
        renderItem={(item) => <span>{item}</span>}
      />
    </div>
  );
}

export default App;
