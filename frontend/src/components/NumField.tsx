import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix: string;
  hint?: string;
  testid: string;
}

export default function NumField({ id, label, value, onChange, suffix, hint, testid }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-semibold text-slate-800">{label}</Label>
      <div className="relative">
        <Input
          id={id}
          inputMode="decimal"
          placeholder="0,00"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.,]/g, ""))}
          className="h-11 bg-white pr-10 font-mono text-base font-medium text-slate-900 transition-[border-color,box-shadow] duration-150 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/25"
          data-testid={testid}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-sm text-slate-400">{suffix}</span>
      </div>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
