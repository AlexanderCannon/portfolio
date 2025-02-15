// input

interface InputProps {
  label: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, value, type = "text", onChange }) => {
  return (
    <label className="flex flex-col gap-1">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-full px-4 py-2 text-black"
      />
    </label>
  );
};

export default Input;