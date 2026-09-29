interface TextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ label, value, onChange }) => {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-ink">
      <span className="font-medium">{label}</span>
      <textarea
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        rows={4}
      />
    </label>
  );
};

export default Textarea;
