import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const facilities = [
  {
    name: 'Delpan Evacuation Center',
    address: 'HXX8+J83, Delpan St, San Nicolas, Manila, Metro Manila',
    details: 'Capacity: 500 people • 0.8 miles away',
    image: require('../assets/images/delpan-evacuation.jpg'),
  },
  {
    name: 'Barangay 123 Hall',
    address: '123 Sampaloc St, Tondo, Manila',
    details: 'Capacity: 300 people • 1.2 miles away',
    image: require('../assets/images/icon.png'),
  },
  {
    name: 'San Nicolas Covered Court',
    address: 'San Nicolas, Manila',
    details: 'Capacity: 200 people • 1.5 miles away',
    image: require('../assets/images/icon.png'),
  },
  {
    name: 'Manila High School Gym',
    address: 'Intramuros, Manila',
    details: 'Capacity: 800 people • 2.0 miles away',
    image: require('../assets/images/icon.png'),
  },
];

export default function EmergencyFacilitiesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={22} color="#d82f13" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Emergency Facilities</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={16} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search facilities..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      {facilities.map((facility, idx) => (
        <TouchableOpacity
          style={styles.card}
          key={facility.name + idx}
          onPress={() => router.push({
            pathname: '/facility-details',
            params: {
              name: facility.name,
              address: facility.address,
              details: facility.details,
              image: idx === 0 ? 'delpan-evacuation.jpg' : 'icon.png',
              description: facility.description || '',
              contact: facility.contact || '099999999',
              hours: facility.hours || '24/7',
              inPerson: facility.inPerson || 'N/A',
              facebook: facility.facebook || 'N/A',
              email: facility.email || 'N/A',
              type: facility.type || 'Evacuation Center',
            }
          })}
        >
          <Image source={facility.image} style={styles.cardImage} resizeMode="cover" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{facility.name}</Text>
            <Text style={styles.cardAddress}>{facility.address}</Text>
            <Text style={styles.cardDetails}>{facility.details}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingTop: 48,
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
    marginBottom: 24,
    color: '#1a1a1a',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3.84,
    elevation: 2,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardDetails: {
    fontSize: 12,
    color: '#888',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
}); 