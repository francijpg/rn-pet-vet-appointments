import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Form = ({
  appointments,
  setAppointments,
  setShowForm,
  saveAppointmentsLocalStorage,
}) => {
  const [patient, setPatient] = useState('');
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [symptom, setSymptom] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmDate = apmtDate => {
    const options = {year: 'numeric', month: 'long', day: '2-digit'};
    setDate(apmtDate.toLocaleDateString('en-EN', options));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmHour = apmtHour => {
    const options = {hour: 'numeric', minute: '2-digit'};
    setHour(apmtHour.toLocaleTimeString('en-EN', options));
    hideTimePicker();
  };

  const showAlert = () => {
    Alert.alert('Error', 'All fields are required', [
      {
        text: 'OK',
      },
    ]);
  };

  const createNewAppointment = () => {
    if (
      patient.trim() === '' ||
      owner.trim() === '' ||
      phone.trim() === '' ||
      date.trim() === '' ||
      hour.trim() === '' ||
      symptom.trim() === ''
    ) {
      showAlert();

      return;
    }

    const appointment = {patient, owner, phone, date, hour, symptom};
    appointment.id = shortid.generate();

    const newAppointments = [...appointments, appointment];
    setAppointments(newAppointments);
    saveAppointmentsLocalStorage(JSON.stringify(newAppointments));

    setShowForm(false);

    setPatient('');
    setOwner('');
    setPhone('');
    setDate('');
    setHour('');
    setSymptom('');
  };

  return (
    <>
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Patient:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPatient(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Owner:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setOwner(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Contact Phone:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPhone(text)}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.label}>Date:</Text>
          <Button title="Select Date" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmDate}
            onCancel={hideDatePicker}
            locale="en_EN"
            headerTextIOS="Choose the date"
          />
          <Text>{date}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hour:</Text>
          <Button title="Select Hour" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmHour}
            onCancel={hideTimePicker}
            locale="en_EN"
            headerTextIOS="Choose the hour"
          />
          <Text>{hour}</Text>
        </View>
        <View>
          <Text style={styles.label}>Symptoms:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={text => setSymptom(text)}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => createNewAppointment()}
            style={styles.btnSubmit}>
            <Text style={styles.textSubmit}>Create New Appointment</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
    marginBottom: 100,
  },
  textSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Form;
