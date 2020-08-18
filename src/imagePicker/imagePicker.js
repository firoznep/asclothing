import React, {Fragment, Component} from 'react';
// import ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ImagePicker from 'react-native-image-crop-picker';
import {IMAGE_DATA, CASHED_IMG_DATA} from './imageData';

export default class GetLocalImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mime: 'image/jpg',
      modificationDate: '1597724303000',
      data: IMAGE_DATA,
      path: CASHED_IMG_DATA,
    };
  }

  imageFromCamera = () => {
    ImagePicker.openCamera({
      width: 225,
      height: 300,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        console.log(image);
        this.setState({
          mime: image.mime,
          data: image.data,
          modificationDate: image.modificationDate,
        });
      })
      .catch((err) => {
        alert('Canceled by user', err);
      });
  };

  imageFromGallery = () => {
    ImagePicker.openPicker({
      width: 225,
      height: 300,
      cropping: true,
      cropperStatusBarColor: '#f00000',
      includeBase64: true,
    })
      .then((image) => {
        console.log(image);
        this.setState({
          mime: image.mime,
          data: image.data,
          modificationDate: image.modificationDate,
        });
      })
      .catch((err) => {
        alert('File not selected', err);
      });
  };

  cashedImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        this.setState({path: image.path});
      })
      .catch((err) => {
        alert('not Selected', err);
      });
  };

  cleanTempImage = () => {
    ImagePicker.clean()
      .then(() => {
        alert('removed all tmp images from tmp directory');
      })
      .catch((e) => {
        alert(e);
      });
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <ScrollView>
              <Image
                source={{
                  uri: `data:${this.state.mime};base64,${this.state.data}`,
                }}
                style={{width: 225, height: 300, borderRadius: 50}}
              />

              <Image
                source={{
                  uri: this.state.path,
                }}
                style={{width: 225, height: 300, borderRadius: 50}}
              />

              <Text>{this.state.modificationDate}</Text>
              <Text>{this.state.mime}</Text>
            </ScrollView>

            <ScrollView style={{minHeight: 350}}>
              {/* IMAGE FROM CAMERA */}
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.imageFromCamera}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Choose image from CAMERA</Text>
                </TouchableOpacity>
              </View>

              {/* IMAGE FROM GALLERY */}
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.imageFromGallery}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Choose image from Gallery</Text>
                </TouchableOpacity>
              </View>

              {/* cashed image about to clean */}
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.cashedImage}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>
                    Choose cashed img from Gallery
                  </Text>
                </TouchableOpacity>
              </View>

              {/* clean image from directory */}
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.cleanTempImage}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>clean image from directory</Text>
                </TouchableOpacity>
              </View>
              <View style={{height: 100}} />
            </ScrollView>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
