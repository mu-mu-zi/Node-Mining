import { DatePicker } from "@douyinfe/semi-ui";
import { DatePickerProps } from "@douyinfe/semi-ui/lib/es/datePicker";
import styled from "styled-components";


export default function DatePickerZ (props: DatePickerProps) {
  return (
    <DatePicker
      {...props}
      dropdownClassName="reset-datepicker-semi"
    />

  )
}