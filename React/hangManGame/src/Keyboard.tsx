import styles from "./Kayboard.module.css"

const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]

export function Keyboard() {
    return <div
    style={{
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
      gap: ".5rem",
    }}
    >
    {KEYS.map( key  => {
        return ( 
            <button  
            className={`${styles.btn}`}
            key={key}>
            {key}
            </button>
            )
            })}             
        </div>
}