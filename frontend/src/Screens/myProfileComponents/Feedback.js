// FeedbackAndSupport.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const FeedbackAndSupport = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmitFeedback = () => {
    // Implement logic to submit feedback to your backend or handle it as needed
    console.log('Submitted Feedback:', { feedback, rating });
    // Optionally, you can reset the form after submission
    setFeedback('');
    setRating(0);
  };

  const navigateToSupport = () => {
    navigation.navigate('Support');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feedback and Support</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your feedback"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        multiline
      />

      <Text style={styles.ratingText}>Rate your experience:</Text>
      {/* Implement your own rating component or use a third-party library */}
      {/* For simplicity, using a basic numeric input for rating in this example */}
      <TextInput
        style={styles.ratingInput}
        placeholder="1-5"
        keyboardType="numeric"
        value={rating.toString()}
        onChangeText={(text) => setRating(parseInt(text, 10) || 0)}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitFeedback}
      >
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.supportButton}
        onPress={navigateToSupport}
      >
        <Text style={styles.buttonText}>Get Support</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 8,
  },
  ratingInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  supportButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FeedbackAndSupport;
