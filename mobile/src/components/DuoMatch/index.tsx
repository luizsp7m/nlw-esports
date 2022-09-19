import * as Clipboard from "expo-clipboard";

import { useState } from "react";
import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { THEME } from "../../theme";
import { Heading } from "../Heading";
import { Ionicons } from "@expo/vector-icons";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert("Discord Copiado!", "Usuário copiado para sua área de transferência.");
    setIsCopping(false);
    onClose();
  }

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <Ionicons name="md-checkmark-circle" size={38} color={THEME.COLORS.SUCCESS} />

          <Heading title="Let's play!" subtitle="Agora é só começar a jogar!" style={{ alignItems: "center", marginTop: 24 }} />
          <Text style={styles.label}>Adicionar no Discord</Text>
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>{isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}