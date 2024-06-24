import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type propsType = {
  typeValue: String;
};

const types = [
  { label: "Income", value: "in" },
  { label: "Expense", value: "ex" },
] as const;

const fromSchema = z.object({
  type: z.string({
    required_error: "Please select a type.",
  }),
  classification: z.string().min(1),
});

const AddClassificationForm = (props: propsType) => {
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      classification: "",
    },
  });

  const submitData = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitData)}
        className="grid gap-6 py-3"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => {
            return (
              <FormItem className="grid grid-cols-3 items-center gap-x-8">
                <FormLabel className="text-right">Type</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={
                      props.typeValue
                        ? types.find((type) => type.value === props.typeValue)
                            ?.label
                        : ""
                    }
                  >
                    <SelectTrigger id="type" className="col-span-2">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {types.map((type) => (
                        <SelectItem value={type.label} key={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="col-start-2 col-span-2" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="classification"
          render={({ field }) => {
            return (
              <FormItem className="grid grid-cols-3 items-center gap-x-8">
                <FormLabel className="text-right">Classification</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoFocus
                    className="col-span-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="col-start-2 col-span-2" />
              </FormItem>
            );
          }}
        />
        <div className="grid grid-cols-3 items-center gap-4">
          <Button type="submit" className="col-start-3">
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddClassificationForm;