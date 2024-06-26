import { useAuth } from "@app/context/AuthContext";
import { useColors } from "@app/context/ColorContex";
import { RootState } from "@app/redux/store";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { HStack, Icon, Text, VStack, useDisclose } from "native-base";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Tokenlist from "../components/Tokenlist";
import local from "@app/utils/locales";
import TransferButton from "../components/TransferButton";
import { useNavigation } from "@react-navigation/native";
import TransferModal from "../components/TransferModal";

const Home: React.FC = () => {
  const { balances, currentAddress } = useAuth();
  const { tick, marketcap } = useSelector((store: RootState) => store.app);
  const { bgColor, textColor, main } = useColors();
  const lang = local.Main.Wallet.Home;
  const navigation = useNavigation();
  const { isOpen, onToggle } = useDisclose();
  const handleTransfer = () => {};

  const BalanceItem = useMemo(() => {
    return (
      <VStack>
        <HStack justifyContent="center" alignItems="center" space="3" p="2">
          <Icon as={FontAwesome5} name="wallet" size="3xl" color={textColor} />
          <Text fontSize="4xl">{lang.MyWallet}</Text>
        </HStack>
        <HStack>
          <Text fontSize="2xl" w="45%" textAlign="center">
            ${" "}
            {(
              balances[currentAddress] * parseFloat(marketcap.price) || 0
            ).toFixed(3)}
          </Text>
          <Text fontSize="2xl" w="45%" textAlign="center">
            {balances[currentAddress] || 0} QU
          </Text>
        </HStack>
        <HStack justifyContent="center">
          <Text fontSize="xl">{lang.CurrentTick}: </Text>
          <Text fontSize="xl">{tick || 0}</Text>
        </HStack>
      </VStack>
    );
  }, [balances, currentAddress, marketcap.price, tick]);

  return (
    <VStack flex={1} space={2} bgColor={bgColor} color={textColor}>
      <VStack>{BalanceItem}</VStack>
      <HStack justifyContent="center">
        <TransferButton
          title=""
          onPress={onToggle}
          icon={
            <Icon as={FontAwesome5} name="share" size="xl" color="white"></Icon>
          }
        ></TransferButton>
        <TransferButton
          title=""
          onPress={() => {
            navigation.navigate("Orderbook");
          }}
          icon={
            <Icon as={AntDesign} name="swap" size="xl" color="white"></Icon>
          }
        ></TransferButton>
        <TransferButton
          title=""
          onPress={() => {
            navigation.navigate("Transaction");
          }}
          icon={
            <Icon
              as={FontAwesome5}
              name="history"
              size="xl"
              color="white"
            ></Icon>
          }
        ></TransferButton>
      </HStack>
      <VStack w="full" flex={1} py="2">
        <HStack alignItems="center" space="3" px="4">
          <Icon as={FontAwesome5} name="coins" size="2xl" color={textColor} />
          <Text fontSize="2xl">{lang.AllAssets}</Text>
        </HStack>
        <VStack flex={1} mt="2">
          <Tokenlist />
        </VStack>
      </VStack>

      <TransferModal
        isOpen={isOpen}
        onToggle={onToggle}
        onPress={handleTransfer}
      />
    </VStack>
  );
};

export default Home;
