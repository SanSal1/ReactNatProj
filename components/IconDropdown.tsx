import { useState } from 'react'
import { IconButton, Menu } from 'react-native-paper'

export default function IconDropdown({
  options,
  onChange,
  selectedOption,
  icon,
  color,
}: {
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  selectedOption: string
  icon: string
  color: string
}) {
  const [visible, setVisible] = useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition='bottom'
      style={{ width: 150 }}
      anchor={
        <IconButton
          icon={icon}
          iconColor={color}
          size={24}
          onPress={openMenu}
        />
      }
    >
      {options.map((option) => {
        const isSelected = option.value === selectedOption
        return (
          <Menu.Item
            key={option.value}
            onPress={() => {
              onChange(option.value)
              closeMenu()
            }}
            title={option.label}
            trailingIcon={isSelected ? 'check' : undefined}
            disabled={isSelected}
            dense
          />
        )
      })}
    </Menu>
  )
}
