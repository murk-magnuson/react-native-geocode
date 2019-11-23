import React from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';

import { Button } from "../components/Button";
import { geoFetch } from '../util/api';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  section: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    marginVertical: 20,
    padding: 14,
    alignItems: "center"
  },
  titleText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 20
  },
  map: {
    width: screen.width,
    height: Math.round(screen.height * 0.25),
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  }
});

class Details extends React.Component {
  state = {
    loading: false,
    updatedItem: null
  };

  handleLogPress = (_id) => {
    this.setState({ loading: true }, () => {
    geoFetch(`/geocache/log-find?_id=${_id}`, { method: 'PUT' })
      .then(res => {

        this.setState({loading: false, updatedItem: res.result});
      })
      .catch(err => {
        console.log('Log press error', err);
      })
      .finally(() => {
        this.setState({ loading: false });
      })
    });
  };

  handleLogClear = (_id) => {
    this.setState({ loading: true }, () =>{
      geoFetch(`/geocache/log-clear?_id=${_id}`, { method: 'PUT' })
        .then(res => {
          this.setState({loading: false, updatedItem: res.result});
        })
        .catch(err => {
          console.log('log clear error', err);
        })
        .finally(() => {
          this.setState({loading: false});
        })
    });
  }

  handleLogDelete = (_id) => {
    this.setState({ loading: false }, () =>{
      geoFetch(`/geocache/log-delete?_id=${_id}`, { method: 'PUT' })
        .then(res => {
          this.setState({loading: false, updatedItem: res.result});
        })
        .catch(err => {
          console.log('log delete error', err);
        })
        .finally(() => {
          this.setState({loading: false});
        })
      this.props.navigation.pop();
    });
  }

  render() {
    const item = this.state.updatedItem
      ? this.state.updatedItem
      : this.props.navigation.getParam("item", {});

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <MapView
            style={styles.map}
            region={{
              latitude: item.latitude,
              longitude: item.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            zoomEnabled={false}
            scrollEnabled={false}
            >
              <Marker coordinate={{latitude: item.latitude, longitude: item.longitude}}/>
          </MapView>
          <View style={styles.section}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>
            <Text style={styles.text}>
              {`Found ${item.foundCount || 0} times.`}
            </Text>
            <Button
              text="Log"
              onPress={() => this.handleLogPress(item._id)}
              loading={this.state.loading}
            />
            <Button
              text="Clear Log"
              onPress={()=> this.handleLogClear(item._id)}
              loading={this.state.loading}
            />
            <Button
              text="Delete Location"
              onPress={()=> this.handleLogDelete(item._id)}
              loading={this.state.loading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Details;
