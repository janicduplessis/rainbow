import { memo, useCallback } from 'react';
import { Box, Text } from '@/design-system';
import { PanelSheet } from '@/components/PanelSheet/PanelSheet';
import ButtonPressAnimation from '@/components/animations/ButtonPressAnimation';
import Routes from '@/navigation/routesNames';
import { useNavigation } from '@/navigation';

export const RnbwStakingLearnSheet = memo(function RnbwStakingLearnSheet() {
  const { navigate } = useNavigation();
  const handlePressEnableStaking = useCallback(() => {
    navigate(Routes.RNBW_STAKING_SCREEN);
  }, [navigate]);

  return (
    <PanelSheet>
      <Box paddingTop={'44px'} paddingBottom={'16px'} paddingHorizontal={'20px'}>
        <Box alignItems="center" gap={16}>
          <Text color="label" size="30pt" weight="heavy" align="center">
            Earn More Rewards With Staking
          </Text>
          <Text color="labelTertiary" size="17pt" weight="medium">
            Staking allows you to earn cashback rewards on your swaps.
          </Text>
        </Box>
        <Box gap={20} paddingVertical={'20px'}>
          <Text color="label" size="17pt" weight="bold">
            {'reason 1'}
          </Text>
          <Text color="label" size="17pt" weight="bold">
            {'reason 2'}
          </Text>
          <Text color="label" size="17pt" weight="bold">
            {'reason 3'}
          </Text>
        </Box>
        <ButtonPressAnimation onPress={handlePressEnableStaking}>
          <Box backgroundColor="yellow" borderRadius={21} width={'full'} height={42} justifyContent="center" alignItems="center">
            <Text color="label" size="17pt" weight="bold">
              {'Enable Staking'}
            </Text>
          </Box>
        </ButtonPressAnimation>
      </Box>
    </PanelSheet>
  );
});
