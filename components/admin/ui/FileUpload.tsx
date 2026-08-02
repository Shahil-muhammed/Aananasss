"use client";

interface Props {
  label: string;
  accept?: string;
  onChange: (file: File | null) => void;
}

export default function FileUpload({
  label,
  accept,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        type="file"
        accept={accept}
        onChange={(e) =>
          onChange(e.target.files?.[0] ?? null)
        }
        className="w-full rounded-lg border px-4 py-3"
      />
    </div>
  );
}