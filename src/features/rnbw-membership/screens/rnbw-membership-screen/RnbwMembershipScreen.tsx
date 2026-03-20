import { memo, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Box } from '@/design-system';
import { AccountImage } from '@/components/AccountImage';
import { Navbar } from '@/components/navbar/Navbar';
import { Navigation, useNavigation } from '@/navigation';
import Routes from '@/navigation/routesNames';
import { RnbwClaimCard } from '@/features/rnbw-membership/screens/rnbw-membership-screen/components/RnbwClaimCard';
import { useRewardsBalanceStore } from '@/features/rnbw-rewards/stores/rewardsBalanceStore';
import { useAirdropBalanceStore } from '@/features/rnbw-rewards/stores/airdropBalanceStore';
import * as i18n from '@/languages';
import { RnbwStakingCard } from '@/features/rnbw-membership/screens/rnbw-membership-screen/components/RnbwStakingCard';

export const RnbwMembershipScreen = memo(function RnbwMembershipScreen() {
  const { navigate } = useNavigation();

  const hasClaimableRewards = useRewardsBalanceStore(state => state.hasClaimableRewards());
  const { tokenAmount: rewardsTokenAmount, nativeCurrencyAmount: rewardsNativeAmount } = useRewardsBalanceStore(state =>
    state.getFormattedBalance()
  );

  const hasClaimableAirdrop = useAirdropBalanceStore(state => state.hasClaimableAirdrop());
  const { tokenAmount: airdropTokenAmount, nativeCurrencyAmount: airdropNativeAmount } = useAirdropBalanceStore(state =>
    state.getFormattedBalance()
  );

  const handlePressClaimRewards = useCallback(() => {
    navigate(Routes.RNBW_REWARDS_CLAIM_SHEET);
  }, [navigate]);

  const handlePressClaimAirdrop = useCallback(() => {
    Navigation.handleAction(Routes.RNBW_AIRDROP_SCREEN);
  }, []);

  return (
    <View style={styles.flex}>
      <Navbar hasStatusBarInset title="Membership" leftComponent={<AccountImage />} />
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer} style={styles.flex}>
        <Box gap={16}>
          <RnbwStakingCard />
          {hasClaimableRewards && (
            <RnbwClaimCard
              tokenAmount={rewardsTokenAmount}
              nativeCurrencyAmount={rewardsNativeAmount}
              title={i18n.t(i18n.l.rnbw_membership.claim_card.rewards)}
              onPressClaim={handlePressClaimRewards}
            />
          )}
          {hasClaimableAirdrop && (
            <RnbwClaimCard
              tokenAmount={airdropTokenAmount}
              nativeCurrencyAmount={airdropNativeAmount}
              title={i18n.t(i18n.l.rnbw_membership.claim_card.airdrop)}
              onPressClaim={handlePressClaimAirdrop}
            />
          )}
        </Box>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollViewContentContainer: {
    paddingHorizontal: 20,
  },
});
