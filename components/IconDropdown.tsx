import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useState } from 'react'
import { View } from 'react-native'
import { IconButton, Menu, Text, useTheme } from 'react-native-paper'

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
  const theme = useTheme()
  const [visible, setVisible] = useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition='bottom'
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
            title={
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 4,
                }}
              >
                <Text
                  variant='labelLarge'
                  style={{
                    opacity: isSelected ? 0.5 : 1,
                  }}
                >
                  {option.label}
                </Text>
                {isSelected && (
                  <MaterialIcons
                    name='check'
                    size={24}
                    color={theme.colors.secondary}
                  />
                )}
              </View>
            }
            disabled={isSelected}
            dense
          />
        )
      })}
    </Menu>
  )
}
