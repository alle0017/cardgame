type Card = {
      img: string
      id: number
      name: string
}
interface Queue<T> {
      watch(topic: string, callback: (value: T) => void): void;
      push(topic: string, value: T): void;
}
interface Topic {
      readonly topic: string
}