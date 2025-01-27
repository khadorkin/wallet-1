import { SpacingProps, SpacingShorthandProps } from '@shopify/restyle'
import React from 'react'
import { Image } from 'react-native'
import { style } from 'src/components/CurrencyLogo/styles'
import { Box } from 'src/components/layout/Box'
import { ChainId, CHAIN_INFO } from 'src/constants/chains'
import { iconSizes } from 'src/styles/sizing'
import { Theme } from 'src/styles/theme'

type NetworkLogoProps = {
  chainId: ChainId
  borderWidth?: number
  borderRadius?: keyof Theme['borderRadii']
  borderColor?: string
  backgroundColor?: string
  size?: number
} & SpacingProps<Theme> &
  SpacingShorthandProps<Theme>

export function NetworkLogo({
  chainId,
  borderWidth = 0,
  borderRadius = 'roundedFull',
  backgroundColor,
  borderColor,
  size = iconSizes.icon20,
  ...rest
}: NetworkLogoProps): JSX.Element {
  const { logo } = CHAIN_INFO[chainId]

  return (
    <Box
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      style={{ backgroundColor, borderColor }}
      {...rest}>
      {logo && (
        <Image
          source={logo}
          style={[
            style.image,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        />
      )}
    </Box>
  )
}
