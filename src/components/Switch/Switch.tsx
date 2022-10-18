import { Switch } from "@douyinfe/semi-ui";
import { SwitchProps } from "@douyinfe/semi-ui/lib/es/switch";
import styled from "styled-components";

const ReSetStyleSwitch = styled(Switch)`
    background-color: #6B6B6B;
    &:hover{
      background-color: #6B6B6B;
    }
    .semi-switch-knob {
      background-color: #3D3D3D;
    }
    &.semi-switch-checked{
      .semi-switch-knob {
        background-color: #F6B91B;
      }
    }

`

export default function SwitchZ (props: SwitchProps) {
  return (
    <ReSetStyleSwitch
      {...props}
    />

  )
}