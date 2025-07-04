import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function LocationDetailsScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style="dark" />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={22} color="#d82f13" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Detailed View</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 14.5995,
            longitude: 120.9842,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{ latitude: 14.5995, longitude: 120.9842 }}
            title="You are here"
          />
        </MapView>
      </View>
      <Text style={styles.sectionTitle}>Evacuation Plans</Text>
      <View style={styles.evacuationPlans}>
        <View style={styles.planItem}>
          <Text style={styles.planNumber}>1.</Text>
          <Text style={styles.planText}>Proceed to the nearest evacuation center: Delpan Evacuation Center</Text>
        </View>
        <View style={styles.planItem}>
          <Text style={styles.planNumber}>2.</Text>
          <Text style={styles.planText}>Follow local authorities' instructions</Text>
        </View>
        <View style={styles.planItem}>
          <Text style={styles.planNumber}>3.</Text>
          <Text style={styles.planText}>Bring essential items and emergency kit</Text>
        </View>
        <View style={styles.planItem}>
          <Text style={styles.planNumber}>4.</Text>
          <Text style={styles.planText}>Stay updated via official channels</Text>
        </View>
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
  mapContainer: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e9ecef',
    marginBottom: 24,
  },
  map: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#d82f13',
  },
  evacuationPlans: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
    gap: 12,
  },
  planItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  planNumber: {
    fontWeight: 'bold',
    color: '#d82f13',
    marginRight: 8,
    fontSize: 16,
    width: 22,
    textAlign: 'right',
  },
  planText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
}); 