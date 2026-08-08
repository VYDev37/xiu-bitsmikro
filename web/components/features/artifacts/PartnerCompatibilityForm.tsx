import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnerFormSchema, type PartnerFormValues } from "@/schemas/bazi";
import { cn } from "@/lib/utils";

interface PartnerCompatibilityFormProps {
    onSubmit: (data: PartnerFormValues) => void;
}

export function PartnerCompatibilityForm({ onSubmit }: PartnerCompatibilityFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<PartnerFormValues>({
        resolver: zodResolver(partnerFormSchema)
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 ml-1">Partner's Name</label>
                <input
                    type="text"
                    placeholder="Enter full name"
                    {...register("partnerName", {
                        onChange: (e) => {
                            e.target.value = e.target.value.toUpperCase();
                        }
                    })}
                    className={cn(
                        "w-full bg-white/5 border rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                        errors.partnerName ? "border-red-500/50" : "border-white/10"
                    )}
                />
                {errors.partnerName && <span className="text-[10px] text-red-400 ml-1">{errors.partnerName.message}</span>}
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 ml-1">Birth Date</label>
                    <input
                        type="date"
                        {...register("partnerDob")}
                        className={cn(
                            "w-full bg-white/5 border rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                            errors.partnerDob ? "border-red-500/50" : "border-white/10"
                        )}
                    />
                    {errors.partnerDob && <span className="text-[10px] text-red-400 ml-1">{errors.partnerDob.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 ml-1">Birth Time <span className="opacity-50">(Optional)</span></label>
                    <input
                        type="time"
                        {...register("partnerTime")}
                        className={cn(
                            "w-full bg-white/5 border rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                            errors.partnerTime ? "border-red-500/50" : "border-white/10"
                        )}
                    />
                    {errors.partnerTime && <span className="text-[10px] text-red-400 ml-1">{errors.partnerTime.message}</span>}
                </div>
            </div>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded-md text-sm font-medium transition-colors w-full"
            >
                Analyze Compatibility
            </button>
        </form>
    );
}