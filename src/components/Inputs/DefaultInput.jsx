

export default function DefaultInput({ placeholder, name, value, onChange, className, extraElement }) {
    return (
      <div className={"flex flex-wrap content-center p-3 rounded-lg transition-shadow focus-within:ring-4 shadow-blue-200 border-blue-400 " + (className ?? "")}>
        <input
          type="text"
          className={"my-auto h-8 grow outline-none " }
          placeholder={placeholder ?? `Write ${name}...`}
          name={name}
          value={value}
          onChange={onChange}
        />
        {extraElement ?? ""}
      </div>

    );
};