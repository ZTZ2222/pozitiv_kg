import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zCategoryAttribute } from "@/types/category.schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const DynamicFormItem = ({ attr }: { attr: zCategoryAttribute }) => {
  const { control } = useFormContext();

  switch (attr.type) {
    case "integer":
      return (
        <FormField
          control={control}
          name={`attribute_${attr.id}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                {attr.name}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={attr.name}
                  {...field}
                  value={field.value || ""}
                  required={!!attr.is_required}
                />
              </FormControl>
            </FormItem>
          )}
        />
      );
    case "text":
      return (
        <FormField
          control={control}
          name={`attribute_${attr.id}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                {attr.name}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={attr.name}
                  {...field}
                  required={!!attr.is_required}
                />
              </FormControl>
            </FormItem>
          )}
        />
      );
    case "select":
      return (
        <FormField
          control={control}
          name={`attribute_${attr.id}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                {attr.name}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                required={!!attr.is_required}
              >
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Выбрать" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {attr.options.map((option) => (
                    <SelectItem key={option.id} value={option.id.toString()}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      );
    case "multiselect":
      return (
        <FormField
          control={control}
          name={`attribute_${attr.id}`}
          render={() => (
            <FormItem className="space-y-2.5">
              <FormLabel className="text-lg font-semibold">
                {attr.name}
              </FormLabel>
              <div className="space-y-2.5 divide-y">
                {attr.options.map((option) => (
                  <FormField
                    key={option.id}
                    control={control}
                    name={`attribute_${attr.id}`}
                    render={({ field }) => {
                      const value = field.value || [];
                      return (
                        <FormItem
                          key={option.id}
                          className="flex flex-row items-start space-x-3 space-y-0 pt-2.5"
                        >
                          <FormControl>
                            <Checkbox
                              checked={value.includes(String(option.id))}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...value,
                                      String(option.id),
                                    ])
                                  : field.onChange(
                                      value.filter(
                                        (value: string) =>
                                          value !== String(option.id),
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="self-center font-normal text-gray-500">
                            {option.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />
      );
    default:
      return null;
  }
};

export default DynamicFormItem;
