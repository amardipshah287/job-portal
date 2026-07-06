export function AuthFormComp({
  type,
  labelText,
  placeHolderText,
  mainText,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={mainText} className=" text-xl">
        {labelText}
      </label>
      <input
        type={type}
        placeholder={placeHolderText}
        name={mainText}
        id={mainText}
        onChange={onChange}
        required
        className=" px-2 py-1 text-xl border-b-2 focus:no-underline focus:outline-none placeholder-slate-400"
      />
    </div>
  );
}
