import { SafeAreaView, StyleSheet, View } from "react-native";
import ChatList from "../../../../components/ChatList";

// dummy rooms
const rooms = [
  {
    id: "1",
    name: "Novu Hangouts",
    messages: [
      {
        id: "1a",
        text: "Hello guys, welcome!",
        time: "07:50",
        user: "Tomer",
      },
      {
        id: "1b",
        text: "Hi Tomer, thank you! 😇",
        time: "08:50",
        user: "David",
      },
    ],
  },
  {
    id: "2",
    name: "Hacksquad Team 1",
    messages: [
      {
        id: "2a",
        text: "Guys, who's awake? 🙏🏽",
        time: "12:50",
        user: "Team Leader",
      },
      {
        id: "2b",
        text: "What's up? 🧑🏻‍💻",
        time: "03:50",
        user: "Victoria",
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    flexDirection: "column",
    gap: 16,
  },
});

const Page = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ChatList rooms={rooms} />
      </View>
    </SafeAreaView>
  );
};

export default Page;
