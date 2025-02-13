
const Button = ({value, link}) => {
  return (
    <div className="w-full flex justify-center mb-10">
        <a href={link} className="bg-white border-teal-700 px-2 py-2 rounded-lg text-base font-bold hover:bg-teal-800 text-teal-800 hover:text-white ring-2 ring-teal-800  duration-150 shadow-md focus:ring focus:ring-cyan-600 focus:ring-offset-5" target="_blnck">{value}</a>
    </div>  
  )
}

export default Button
