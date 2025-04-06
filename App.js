import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSend = async () => {
    try {
      const res = await axios.post('http://192.168.2.111:3001/api/gpt', { text });
      setTasks(res.data);
    } catch (error) {
      console.error('API error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI TODO アプリ</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="やることを入力（例: 洗濯して、買い物して…）"
      />
      <Button title="送信" onPress={handleSend} />
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.task}>{item.task}（優先度：{item.priority}）</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
    backgroundColor: '#ffffff', // ← 背景を白に！
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // ← 文字を濃いグレーに！
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    color: '#000', // ← 入力中の文字が黒く見えるように
    backgroundColor: '#f5f5f5', // ← 入力欄背景も淡く
  },
  task: {
    fontSize: 16,
    marginVertical: 4,
    color: '#000', // ← タスク文字も黒に！
  },
});

