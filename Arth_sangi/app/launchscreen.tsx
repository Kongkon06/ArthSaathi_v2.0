import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const LaunchScreen = () => {
  const router = useRouter();

  // Animated values
  const brandNameOpacity = useRef(new Animated.Value(0)).current;
  const brandNameTranslateY = useRef(new Animated.Value(30)).current;
  const headingOpacity = useRef(new Animated.Value(0)).current;
  const headingTranslateY = useRef(new Animated.Value(30)).current;
  const sparkleScale = useRef(new Animated.Value(0)).current;
  const sparkleRotation = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslateY = useRef(new Animated.Value(30)).current;

  // Interpolated value for sparkle rotation
  const sparkleRotationInterpolated = sparkleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    // Sequence animations
    Animated.sequence([
      Animated.parallel([
        Animated.timing(brandNameOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(brandNameTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(headingOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(headingTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleRotation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    // Navigate to auth screen for sign up
    router.push('/auth');
  };

  const handleSignIn = () => {
    // Navigate to auth screen for sign in
    router.push('/auth');
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
          <Animated.Text 
            style={[
              styles.brandName,
              {
                opacity: brandNameOpacity,
                transform: [{ translateY: brandNameTranslateY }],
              }
            ]}
          >
            ArthSaathi
          </Animated.Text>

          {/* Main Heading */}
          <Animated.View 
            style={[
              styles.headingContainer,
              {
                opacity: headingOpacity,
                transform: [{ translateY: headingTranslateY }],
              }
            ]}
          >
            <Text style={styles.mainHeading}>Smart</Text>
            <Text style={styles.mainHeading}>Financial</Text>
            <Text style={styles.mainHeading}>Planning</Text>
            <View style={styles.lastLineContainer}>
              <Text style={styles.mainHeading}>for Modern</Text>
            </View>
            <View style={styles.familiesContainer}>
              <Text style={styles.mainHeading}>Families</Text>
              <Animated.Text 
                style={[
                  styles.sparkle,
                  {
                    transform: [
                      { scale: sparkleScale },
                      { rotate: sparkleRotationInterpolated },
                    ],
                  }
                ]}
              >
                ✦
              </Animated.Text>
            </View>
          </Animated.View>

          {/* CTA Buttons */}
          <Animated.View 
            style={[
              styles.buttonContainer,
              {
                opacity: buttonsOpacity,
                transform: [{ translateY: buttonsTranslateY }],
              }
            ]}
          >
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
          </Animated.View>
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
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 50,
  },
  mainHeading: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
    textAlign: 'left',
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