import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const LaunchScreen = () => {
 const handleGetStarted = () => {
  router.push('/auth?mode=signup');
};

const handleSignIn = () => {
  router.push('/auth?mode=signin');
};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <LinearGradient
        colors={['#8B7CF6', '#3B82F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Brand Name */}
          <Text style={styles.brandName}>ArthSaathi</Text>

          {/* Main Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.mainHeading}>Smart</Text>
            <Text style={styles.mainHeading}>Financial</Text>
            <Text style={styles.mainHeading}>Planning</Text>
            <View style={styles.lastLineContainer}>
              <Text style={styles.mainHeading}>for Modern</Text>
            </View>
            <View style={styles.familiesContainer}>
              <Text style={styles.mainHeading}>Families</Text>
              <Text style={styles.sparkle}>✦</Text>
            </View>
          </View>

          {/* CTA Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.getStartedButton}
              onPress={handleGetStarted}
              activeOpacity={0.9}
            >
              <Text style={styles.getStartedText}>Get started</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.signInButton}
              onPress={handleSignIn}
              activeOpacity={0.8}
            >
              <Text style={styles.signInText}>Have an account? Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 60,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
    textAlign: 'left',
    marginBottom: 60,
  },
  headingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -80,
  },
  mainHeading: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    lineHeight: 56,
    letterSpacing: -1,
  },
  lastLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  familiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkle: {
    fontSize: 32,
    color: 'white',
    marginLeft: 12,
    marginTop: -8,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 16,
  },
  getStartedButton: {
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 50,
    width: width - 48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3B82F6',
  },
  signInButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  signInText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});

export default LaunchScreen;