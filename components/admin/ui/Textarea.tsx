interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function Textarea({
  label,
  ...props
}: TextareaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        {...props}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
      />
    </div>
  );
}