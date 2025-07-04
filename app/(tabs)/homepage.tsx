import { StyleSheet, TouchableOpacity, Alert, Text, View, ScrollView, TextInput, Image } from 'react-native';
import { router, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { useContext } from 'react';
import { UserContext } from '../../constants/UserContext';

export default function HomepageScreen() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Navigate back to auth screen
            router.replace('/auth');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.profileIcon}>
            <FontAwesome name="user" size={20} color="white" />
          </View>
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeMessage}>Hi, welcome back,</Text>
            <Text style={styles.userName}>{user.fullName || 'User'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <View style={{ position: 'relative' }}>
            <FontAwesome name="bell" size={24} color="#333" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>2</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.separator} />
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={16} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search locations or centers"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        
        {/* Location Card */}
        <TouchableOpacity style={styles.card} onPress={() => router.push('/location-details')}>
          <Text style={styles.cardTitle}>Your Location</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 14.5995, // Example: Manila
                longitude: 120.9842,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              showsUserLocation={true}
              scrollEnabled={false}
              zoomEnabled={false}
              pitchEnabled={false}
              rotateEnabled={false}
            >
              <Marker
                coordinate={{ latitude: 14.5995, longitude: 120.9842 }}
                title="You are here"
              />
            </MapView>
          </View>
          <Text style={styles.riskTitle}>Flood Risk Information</Text>
          <Text style={styles.riskPercentage}>0% Chance</Text>
          <Text style={styles.riskDescription}>Rivers, Lakes, Sealine nearby</Text>
          <Text style={styles.locationInfo}>Laguna Lake 20m high</Text>
          <Text style={styles.distanceInfo}>5 Miles away from you</Text>
        </TouchableOpacity>

        {/* Evacuation Centers Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Evacuation Centers</Text>
          <TouchableOpacity onPress={() => router.push('/emergency-facilities')}>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Evacuation Center Card */}
        <TouchableOpacity style={styles.card} onPress={() => router.push({
          pathname: '/facility-details',
          params: {
            name: 'Delpan Evacuation Center',
            address: 'HXX8+J83, Delpan St, San Nicolas, Manila, Metro Manila',
            details: 'Capacity: 500 people • 0.8 miles away',
            image: 'delpan-evacuation.jpg',
            description: 'This is the main evacuation center for the area. It is equipped with basic facilities and can accommodate up to 500 people.',
            contact: '099999999',
            hours: '24/7',
            inPerson: 'Barangay Official',
            facebook: 'N/A',
            email: 'N/A',
            type: 'Evacuation Center',
          }
        })}>
          <View style={styles.evacuationCardContent}>
            <Image
              source={require('../../assets/images/delpan-evacuation.jpg')}
              style={styles.evacuationImage}
              resizeMode="cover"
            />
            <View style={styles.evacuationTextContent}>
              <Text style={styles.evacuationTitle}>Delpan Evacuation Center</Text>
              <Text style={styles.evacuationAddress}>HXX8+J83, Delpan St, San Nicolas, Manila, Metro Manila</Text>
              <Text style={styles.evacuationDetails}>Capacity: 500 people • 0.8 miles away</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d82f13',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  welcomeText: {
    flex: 1,
  },
  welcomeMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationIcon: {
    padding: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
    backgroundColor: '#eee',
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  mapContainer: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e9ecef',
    marginBottom: 12,
  },
  map: {
    flex: 1,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginHorizontal: 4,
  },
  imagePlaceholderText: {
    color: '#6c757d',
    fontSize: 14,
  },
  riskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  riskPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d82f13',
    marginBottom: 4,
  },
  riskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  locationInfo: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  distanceInfo: {
    fontSize: 14,
    color: '#666',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    fontSize: 14,
    color: '#d82f13',
    fontWeight: '600',
  },
  evacuationCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  evacuationImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  evacuationTextContent: {
    flex: 1,
  },
  evacuationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  evacuationAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  evacuationDetails: {
    fontSize: 12,
    color: '#888',
  },
  searchContainer: {
    marginBottom: 16,
    marginHorizontal: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#d82f13',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 