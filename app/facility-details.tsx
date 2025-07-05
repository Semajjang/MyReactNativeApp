import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const imageMap: Record<string, any> = {
  'delpan-evacuation.jpg': require('../assets/images/delpan-evacuation.jpg'),
  '123hall.jpg': require('../assets/images/123hall.jpg'),
  'sportsevac.jpg': require('../assets/images/sportsevac.jpg'),
  'delpan-sports.jpg': require('../assets/images/delpan-sports.jpg'),
  'icon.png': require('../assets/images/icon.png'),
};

export default function FacilityDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const imageSource = imageMap[params.image as string] || imageMap['icon.png'];
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={22} color="#d82f13" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{params.name}</Text>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <Text style={styles.address}>Address: {params.address}</Text>
      <Text style={styles.sectionTitle}>Details</Text>
      <Text style={styles.description}>{params.description || params.details || 'No details available.'}</Text>
      <Text style={styles.sectionTitle}>Emergency Contact</Text>
      <View style={styles.contactSection}>
        <Text style={styles.contactLabel}>Contact No:</Text>
        <Text style={styles.contactValue}>{params.contact}</Text>
        <Text style={styles.contactLabel}>Operating Hours:</Text>
        <Text style={styles.contactValue}>{params.hours}</Text>
        <Text style={styles.contactLabel}>Contact In Person:</Text>
        <Text style={styles.contactValue}>{params.inPerson}</Text>
        <Text style={styles.contactLabel}>Facebook Page:</Text>
        <Text style={styles.contactValue}>{params.facebook}</Text>
        <Text style={styles.contactLabel}>Email:</Text>
        <Text style={styles.contactValue}>{params.email}</Text>
        <Text style={styles.contactLabel}>Type:</Text>
        <Text style={styles.contactValue}>{params.type}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'flex-start',
    gap: 6,
  },
  backText: {
    color: '#d82f13',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#e9ecef',
  },
  address: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  contactSection: {
    marginTop: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 14,
  },
  contactLabel: {
    fontSize: 13,
    color: '#888',
    fontWeight: 'bold',
    marginTop: 8,
  },
  contactValue: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
}); 