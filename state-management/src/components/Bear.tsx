import useBear from "../stores/bears"

export function BearCounter() {
  const bears = useBear((state) => state.bears)
  return <h1>{bears} bears around here...</h1>
}

export function Controls() {
  const increasePopulation = useBear((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
