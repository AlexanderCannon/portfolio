interface InputProps {
  label: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  type = "text",
  onChange,
}) => {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-ink">
      <span className="font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
      />
    </label>
  );
};

export default Input;
