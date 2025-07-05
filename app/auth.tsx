import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../constants/UserContext';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordReqs, setPasswordReqs] = useState<string[]>([]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const { setUser } = useContext(UserContext);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleAuth = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setPasswordReqs([]);
    setFullNameError('');
    setPhoneError('');
    if (!email || !password) {
      if (!email) setEmailError('Email is required.');
      if (!password) setPasswordError('Password is required.');
      valid = false;
    }
    if (!isLogin) {
      if (!fullName) {
        setFullNameError('Full name is required.');
        valid = false;
      }
      if (!phone) {
        setPhoneError('Mobile phone is required.');
        valid = false;
      }
      // PH number validation
      if (phone) {
        const phoneDigits = phone.replace(/\D/g, '');
        if (
          !(
            (phoneDigits.length === 11 && phoneDigits.startsWith('09')) ||
            (phoneDigits.length === 10 && phoneDigits.startsWith('9'))
          )
        ) {
          setPhoneError('Not a valid PH number');
          valid = false;
        }
      }
    }
    // Email validation: must contain '@' and be at least 6 characters
    if (email && (!email.includes('@') || email.length < 6)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }
    // Password validation: at least 1 capital letter, 1 number, and 6 characters
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const reqs: string[] = [];
    if (password && password.length < 6) reqs.push('At least 6 characters');
    if (password && !hasCapital) reqs.push('At least 1 capital letter');
    if (password && !hasNumber) reqs.push('At least 1 number');
    if (reqs.length > 0) {
      setPasswordReqs(reqs);
      valid = false;
    }
    if (!isLogin && password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      valid = false;
    }
    if (!valid) return;

    // Animate button press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Set user info globally
    setUser({ fullName: isLogin ? fullName : fullName, email });

    // TODO: Implement actual authentication logic
    // Alert.alert('Success', isLogin ? 'Login successful!' : 'Signup successful!');
    // Navigate to main app
    router.replace('/homepage');
  };

  const toggleAuthMode = () => {
    // Fade out current content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Toggle mode
      setIsLogin(!isLogin);
      
      // Slide animation
      slideAnim.setValue(isLogin ? -50 : 50);
      
      // Fade in new content
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.container}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            }
          ]}
        >
          <Text style={styles.title}>{isLogin ? 'Welcome' : 'Create Account'}</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View 
          style={[
            styles.form,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            }
          ]}
        >
          {!isLogin && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
              {!!fullNameError && <Text style={styles.errorText}>{fullNameError}</Text>}
            </>
          )}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
          {!isLogin && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Mobile Phone (+63)"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={11}
                inputMode="numeric"
                autoCorrect={false}
                autoComplete="off"
                textContentType="telephoneNumber"
                returnKeyType="done"
              />
              {!!phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
            </>
          )}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {passwordReqs.length > 0 && (
            <View style={{ marginBottom: 8, marginLeft: 4 }}>
              {passwordReqs.map((req, idx) => (
                <Text key={req} style={styles.errorText}>{`• ${req}`}</Text>
              ))}
            </View>
          )}
          {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
          {!isLogin && (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }],
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </Animated.View>
          )}

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity style={styles.button} onPress={handleAuth}>
              <Text style={styles.buttonText}>
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* Toggle */}
        <Animated.View 
          style={[
            styles.toggleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            }
          ]}
        >
          <Text style={styles.toggleText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <TouchableOpacity onPress={toggleAuthMode}>
            <Text style={styles.toggleButton}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#d82f13',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: '#666666',
  },
  toggleButton: {
    fontSize: 14,
    color: '#d82f13',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#d82f13',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
}); 