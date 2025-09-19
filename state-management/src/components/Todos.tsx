import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Todo 타입 정의
interface Todo {
  id: number;
  title: string;
}

// API 함수들의 타입 정의
const getTodos = async (): Promise<Todo[]> => {
  // API 구현
  return [];
};

const postTodo = async (newTodo: Todo): Promise<Todo> => {
  // API 구현
  return newTodo;
};

const Todos = () => {
  /* 1. Query & Mutation 선언 */
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div>
      <ul>
        {/* 2. Query 데이터 사용 */}
        {query.data?.map((todo: Todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          {
            /* 3. Mutation 사용 */
          }
          mutation.mutate({
            id: Date.now(),
            title: "Do Laundry",
          });
        }}>
        Add Todo
      </button>
    </div>
  );
};

export default Todos;
