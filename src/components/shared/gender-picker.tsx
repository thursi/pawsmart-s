"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Noop, RefCallBack } from "react-hook-form";
import { FormControl } from "../ui/form";

type Props = {
  onChange: (...event: string[]) => void;
  onBlur: Noop;
  value: string;
  disabled?: boolean | undefined;
  name: "email";
  ref: RefCallBack;
};

const GenderPicker = (props: Props) => {
  return (
    <Select onValueChange={props.onChange} defaultValue={props.value}>
      <FormControl>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default GenderPicker;
