import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const {GoogleGenerativeAI} = require('@google/generative-ai');
import {API_KEY} from './api';
const App = () => {
  const [userInput, setUserInput] = useState('');
  const [chat, setChat] = useState('');
  const [error, setError] = useState('');

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

  const handleInput = async () => {
    const result = await model.generateContent(userInput);
    const response = result.response;
    const text = response.text();
    setChat(text);
    console.log(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Chatbot</Text>
      <View style={styles.chatContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message here"
            onChangeText={text => setUserInput(text)}
            value={userInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleInput}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          {chat ? <Text style={styles.output}>{chat}</Text> : null}
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatContainer: {
    width: '90%',
    height: '70%',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F2F2F2',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: 'black',
  },
  sendButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  outputContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  output: {
    fontSize: 16,
    backgroundColor: 'black',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default App;
