


export default function DefaultButton({onClick, children, className=""}) {
    return (
        <button
          className={` p-3 shadow-lg rounded-lg hover:outline-2 outline-blue-600 hover:scale-110 transition duration-300 ` + className}
          onClick={onClick}
        >
          {children}
        </button>
    );
}