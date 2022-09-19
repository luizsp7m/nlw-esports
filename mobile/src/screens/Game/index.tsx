import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { useCallback, useEffect, useState } from "react";

import logoImg from "../../assets/logo-nlw-esports.png";
import { DuoMatch } from "../../components/DuoMatch";
import { api } from "../../lib/axios";
import { Loading } from "../../components/Loading";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");
  const [loadingDuos, setLoadingDuos] = useState(true);

  const navigation = useNavigation();

  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  const getAds = useCallback(async () => {
    setLoadingDuos(true);
    const { data } = await api.get(`/games/${game.id}/ads`)
    setLoadingDuos(false);
    setDuos(data);
  }, [])

  async function getDiscordUser(adId: string) {
    const { data } = await api.get(`/ads/${adId}/discord`);
    setDiscordDuoSelected(data.discord);
  }

  useEffect(() => {
    getAds();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        {loadingDuos ? <Loading /> : (
          <FlatList
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <DuoCard
                data={item}
                onConnect={() => getDiscordUser(item.id)}
              />
            )}
            horizontal
            style={styles.containerList}
            contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
            showsHorizontalScrollIndicator
            ListEmptyComponent={
              <Text style={styles.emptyListText}>
                Não há anúncios publicados ainda.
              </Text>
            }
          />
        )}

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          onClose={() => setDiscordDuoSelected("")}
          discord={discordDuoSelected}
        />
      </SafeAreaView>
    </Background>
  );
}