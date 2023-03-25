import * as SelectPrimitive from '@radix-ui/react-select';
import { BiCheck, BiChevronDown } from 'react-icons/bi';

type SelectProps = {
  options: {
    label: string
    options: {
      label: string
      value: string
    }[]
  }[]
  value: string
  onValueChange: (value: string) => void
}

export const Select = ({ options, value, onValueChange }: SelectProps) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className="bg-neutral-700 w-full px-4 flex items-center justify-between h-10 rounded border border-neutral-500/50 focus-within::border-pink-600 text-neutral-200 transition-colors">
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <BiChevronDown size={20} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="bg-neutral-800 border border-neutral-500 p-2 rounded shadow-md">
          <SelectPrimitive.ScrollUpButton />
          <SelectPrimitive.Viewport>

            {options.map(group => (
              <SelectPrimitive.Group key={group.label}>
                <SelectPrimitive.Label className="text-sm text-neutral-500 py-1">
                  {group.label}
                </SelectPrimitive.Label>
                {group.options.map(option => (
                  <SelectPrimitive.Item value={option.value} key={option.value}
                    className="cursor-pointer px-2 py-1 hover:bg-neutral-700 text-neutral-300 transition-colors flex items-center gap-1"
                  >
                    <SelectPrimitive.ItemIndicator className="text-pink-500">
                      <BiCheck size={20} />
                    </SelectPrimitive.ItemIndicator>
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Group>
            ))}

            <SelectPrimitive.Separator />
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton />
          <SelectPrimitive.Arrow />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}