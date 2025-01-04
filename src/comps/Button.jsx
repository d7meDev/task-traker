
const Button = ({color = "Aliceblue",text = "Add",func}) => {
   
   
  return (
    <button style={{backgroundColor: color}} className="btn"  onClick={func}>{text}</button>
  )
}


export default Button
