import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// const apiKey = '';

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleInput = async () => {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: input}],
          }),
        },
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setOutput(data.choices[0].message.content);
        setError('');
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred while fetching the response.');
    }

    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Chatbot</Text>
      <View style={styles.chatContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message here"
            onChangeText={text => setInput(text)}
            value={input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleInput}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          {output ? <Text style={styles.output}>{output}</Text> : null}
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
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default App;
