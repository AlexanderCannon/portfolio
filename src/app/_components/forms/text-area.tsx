interface TextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ label, value, onChange }) => {
  return (
    <label className="flex flex-col gap-1">
      <span>{label}</span>
      <textarea
        value={value}
        onChange={onChange}
        className="w-full rounded-lg px-4 py-2 text-black"
      />
    </label>
  );
};

export default Textarea;