import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IAttribute } from "@/types/category.interface";
import StepperFormActions from "./StepperFormActions";
import { Checkbox } from "@/components/ui/checkbox";
import BackButton from "@/components/BackButton";

const DynamicFormStep = ({ attrGroup }: { attrGroup: IAttribute[] }) => {
  const { control } = useFormContext();
  return (
    <div className="space-y-6">
      <BackButton />
      {attrGroup.map((attr) => {
        switch (attr.type) {
          case "integer":
            return (
              <FormField
                key={attr.id}
                control={control}
                name={attr.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      {attr.name}
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={attr.name} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          case "text":
            return (
              <FormField
                key={attr.id}
                control={control}
                name={attr.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      {attr.name}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={attr.name} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          case "select":
            return (
              <FormField
                key={attr.id}
                control={control}
                name={attr.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      {attr.name}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Выбрать" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {attr.options.map((option) => (
                          <SelectItem key={option.id} value={option.name}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          case "multiselect":
            return (
              <FormField
                key={attr.id}
                control={control}
                name={attr.name}
                render={() => (
                  <FormItem className="space-y-2.5">
                    <FormLabel className="text-lg font-semibold">
                      {attr.name}
                    </FormLabel>
                    <div className="space-y-2.5 divide-y">
                      {attr.options.map((item) => (
                        <FormField
                          key={item.id}
                          control={control}
                          name={attr.name}
                          render={({ field }) => {
                            const value = field.value || [];
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0 pt-2.5"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={value.includes(item.name)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...value, item.name])
                                        : field.onChange(
                                            value.filter(
                                              (value: string) =>
                                                value !== item.name,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="self-center font-normal text-gray-500">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          default:
            return null;
        }
      })}
      <StepperFormActions attrGroup={attrGroup} />
    </div>
  );
};

export default DynamicFormStep;
