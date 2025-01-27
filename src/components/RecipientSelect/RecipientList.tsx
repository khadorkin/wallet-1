import { BottomSheetSectionList } from '@gorhom/bottom-sheet'
import React from 'react'
import { ListRenderItemInfo, SectionListData } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { AddressDisplay } from 'src/components/AddressDisplay'
import { TouchableArea } from 'src/components/buttons/TouchableArea'
import { AnimatedFlex, Inset } from 'src/components/layout'
import { SearchableRecipient } from 'src/components/RecipientSelect/types'
import { Text } from 'src/components/Text'

interface RecipientListProps {
  sections: SectionListData<SearchableRecipient>[]
  onPress: (recipient: string) => void
}

export function RecipientList({ onPress, sections }: RecipientListProps): JSX.Element {
  const renderItem = function ({ item }: ListRenderItemInfo<SearchableRecipient>): JSX.Element {
    return (
      <AnimatedFlex entering={FadeIn} exiting={FadeOut} py="spacing12">
        <RecipientRow recipient={item} onPress={onPress} />
      </AnimatedFlex>
    )
  }

  return (
    <BottomSheetSectionList
      ListFooterComponent={<Inset all="spacing36" />}
      keyExtractor={key}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      renderItem={renderItem}
      renderSectionHeader={SectionHeader}
      sections={sections}
    />
  )
}

function SectionHeader(info: { section: SectionListData<SearchableRecipient> }): JSX.Element {
  return (
    <AnimatedFlex backgroundColor="background1" entering={FadeIn} exiting={FadeOut} py="spacing8">
      <Text color="textSecondary" variant="subheadSmall">
        {info.section.title}
      </Text>
    </AnimatedFlex>
  )
}

function key(recipient: SearchableRecipient): string {
  return `recipient-${recipient.address}`
}

interface RecipientProps {
  recipient: SearchableRecipient
  onPress: (recipient: string) => void
}

export function RecipientRow({ recipient, onPress }: RecipientProps): JSX.Element {
  return (
    <TouchableArea hapticFeedback onPress={(): void => onPress(recipient.address)}>
      <AddressDisplay address={recipient.address} size={35} />
    </TouchableArea>
  )
}
