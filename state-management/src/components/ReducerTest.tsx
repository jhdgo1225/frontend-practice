import { useCountStore } from "../stores/Reducer";

const ReducerTest = () => {
  const dispatch = useCountStore((state) => state.dispatch);
  const count = useCountStore((state) => state.count);
  const increment = () => dispatch({ type: "increment", qty: 20 });
  const decrement = () => dispatch({ type: "decrement", qty: 10 });
  return (
    <>
      <h1>{count}</h1>
      <button onClick={increment}>증가(+20)</button>
      <button onClick={decrement}>감소(-10)</button>
    </>
  );
};

export default ReducerTest;
