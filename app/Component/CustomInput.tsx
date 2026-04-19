type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
};

export function CustomInput({
  label,
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}