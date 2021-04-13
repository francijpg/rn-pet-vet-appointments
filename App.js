import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Appointment from './components/Appointment';
import Form from './components/Form';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getLocalStorageAppointments = async () => {
      try {
        const apmtLC = await AsyncStorage.getItem('petAppointment');
        if (apmtLC) {
          setAppointments(JSON.parse(apmtLC));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLocalStorageAppointments();
  }, []);

  const deletePatient = id => {
    const filteredAppointments = appointments.filter(apmt => apmt.id !== id);
    setAppointments(filteredAppointments);
    saveAppointmentsLocalStorage(JSON.stringify(filteredAppointments));
  };

  const showAppointmentForm = () => {
    setShowForm(!showForm);
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  const saveAppointmentsLocalStorage = async appointmentsJSON => {
    try {
      await AsyncStorage.setItem('petAppointment', appointmentsJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Pet Vet Appointments App</Text>

        <View>
          <TouchableHighlight
            onPress={() => showAppointmentForm()}
            style={styles.btnShowForm}>
            <Text style={styles.textShowForm}>
              {showForm
                ? 'Cancel Create New Appointment'
                : 'Create New Appointment'}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          {showForm ? (
            <>
              <Text style={styles.title}>Create New Appointment</Text>
              <Form
                appointments={appointments}
                setAppointments={setAppointments}
                setShowForm={setShowForm}
                saveAppointmentsLocalStorage={saveAppointmentsLocalStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>
                {appointments.length > 0
                  ? 'Manage your appointments'
                  : 'No appointments yet, add one'}
              </Text>
              <FlatList
                style={styles.list}
                data={appointments}
                renderItem={({item}) => (
                  <Appointment item={item} deletePatient={deletePatient} />
                )}
                keyExtractor={apmt => apmt.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  mainTitle: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  list: {
    flex: 1,
  },
  btnShowForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textShowForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
