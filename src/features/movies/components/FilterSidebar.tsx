import { zodResolver } from "@hookform/resolvers/zod";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/Button";
import { countryOptions, sortFieldOptions, yearOptions } from "../../../constants/filters";
import { cn } from "../../../utils/cn";

const sortFieldValues = ["modified.time", "year", "_id"] as const;

const filterSchema = z.object({
  country: z.array(z.string()),
  year: z.string(),
  sortField: z.enum(sortFieldValues),
  sortType: z.enum(["asc", "desc"]),
});

export type FilterFormValues = z.infer<typeof filterSchema>;

interface FilterSidebarProps {
  values: FilterFormValues;
  onApply: (values: FilterFormValues) => void;
  onReset: () => void;
}

export function FilterSidebar({ values, onApply, onReset }: FilterSidebarProps) {
  const { control, register, handleSubmit, reset } = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: values,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    reset(values);
  }, [reset, values]);

  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      {/* Mobile filter toggle */}
      <div className="block lg:hidden">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-white/10 bg-white/5 py-3 hover:bg-white/10 rounded-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <SlidersHorizontal className="h-4.5 w-4.5 text-brand" />
          {isOpen ? "Ẩn bộ lọc tìm kiếm" : "Hiển thị bộ lọc phim"}
        </Button>
      </div>

      <aside className={cn(
        "rounded-2xl border border-white/5 bg-white/[0.02] p-5 shadow-xl transition-all duration-300",
        !isOpen && "hidden lg:block"
      )}>
        <div className="mb-5 flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-brand" aria-hidden="true" />
          <h2 className="text-lg font-bold">Bộ lọc phim</h2>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit((data) => {
          onApply(data);
          setIsOpen(false);
        })}>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <fieldset className="space-y-2">
                <legend className="text-sm font-semibold text-white/60">Quốc gia</legend>
                <div className="grid max-h-52 gap-2 overflow-y-auto rounded-xl border border-white/5 bg-black/40 p-2.5 no-scrollbar">
                  {countryOptions.map((item) => {
                    const isChecked = field.value.includes(item.slug);

                    return (
                      <label
                        key={item.slug}
                        className={cn(
                          "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-white/70 transition hover:bg-white/5",
                          isChecked && "bg-brand/10 text-white font-semibold",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(event) => {
                            const nextValue = event.target.checked
                              ? [...field.value, item.slug]
                              : field.value.filter((slug) => slug !== item.slug);
                            field.onChange(nextValue);
                          }}
                          className="h-4 w-4 rounded border-white/20 accent-brand text-brand bg-black"
                        />
                        {item.name}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}
          />

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-white/60">Năm phát hành</span>
            <select className="h-11 w-full rounded-xl border border-white/5 bg-black/50 px-3.5 text-sm text-white outline-none focus:border-brand/40" {...register("year")}>
              <option value="">Tất cả</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-white/60">Sắp xếp theo</span>
            <select className="h-11 w-full rounded-xl border border-white/5 bg-black/50 px-3.5 text-sm text-white outline-none focus:border-brand/40" {...register("sortField")}>
              {sortFieldOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-white/60">Thứ tự sắp xếp</span>
            <select className="h-11 w-full rounded-xl border border-white/5 bg-black/50 px-3.5 text-sm text-white outline-none focus:border-brand/40" {...register("sortType")}>
              <option value="desc">Giảm dần (DESC)</option>
              <option value="asc">Tăng dần (ASC)</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
            <Button type="submit" className="rounded-xl bg-brand text-white hover:bg-brand/90 py-2.5">Lọc phim</Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl py-2.5"
              onClick={() => {
                reset();
                onReset();
                setIsOpen(false);
              }}
            >
              <X className="h-4 w-4 mr-1" aria-hidden="true" />
              Đặt lại
            </Button>
          </div>
        </form>
      </aside>
    </div>
  );
}
