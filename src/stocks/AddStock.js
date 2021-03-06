import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Image,
  Text,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import ImagePicker from 'react-native-image-crop-picker';

import CustomBtn from '../components/CustomBtn';
import CustomInput from '../components/CustomInput';

import {openDatabase} from 'react-native-sqlite-storage';
import {connect} from 'react-redux';
import {MY_PIC_DATA} from '../imagePicker/imageData';

var db = openDatabase({name: 'stockDatabase.db'});

const AddStock = ({navigation, stock}) => {
  let [date, setDate] = useState(new Date().toDateString());
  let [itemName, setItemName] = useState('');
  let [itemColor, setItemColor] = useState('not specify');
  let [itemSize, setItemSize] = useState('free size');
  let [quantity, setQuantity] = useState(0);
  let [unit, setUnit] = useState('pcs');
  let [unitRate, setUnitRate] = useState(0);
  let [description, setDescription] = useState('no description!');

  // image selector
  let [imgMime, setImgMime] = useState('image/jpg');
  let [imgData, setImgData] = useState(MY_PIC_DATA);

  // GET IMAGE FROM GALLERY
  const imgFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        setImgData(image.data);
      })
      .catch((err) => {
        alert('Canceled by user', err);
      });
  };

  // GET IMAGE FROM CAMERA
  const imgFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        setImgData(image.data);
      })
      .catch((err) => {
        alert('Canceled by user', err);
      });
  };

  let t_amount = quantity * unitRate;

  let add_stock = () => {
    if (!itemName) {
      alert('Please fill name');
      return;
    }
    if (!quantity) {
      alert('Please fill quantity');
      return;
    }
    if (!unitRate) {
      alert('Please fill unitRate');
      return;
    }

    db.transaction(function (txn) {
      // INSERT ITEM INTO TABLE
      txn.executeSql(
        'INSERT INTO stock_table (date, img_data, item_name, item_color, item_size, quantity, unit, unit_rate, total_amount, description) values (?,?,?,?,?,?,?,?,?,?)',
        [
          date,
          imgData,
          itemName,
          itemColor,
          itemSize,
          quantity,
          unit,
          unitRate,
          t_amount,
          description,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are added item Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('StocksDetail'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Process Failed');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, marginHorizontal: 20, marginTop: 20}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              {/* image from gallery */}

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginHorizontal: 45,
                }}>
                <Image
                  source={{
                    uri: `data:${imgMime};base64,${imgData}`,
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                  }}
                  // resizeMode="contain"
                />

                <View style={{marginRight: 20}}>
                  <CustomBtn
                    title="Select image from Gallery"
                    onBtnPress={imgFromGallery}
                    style={{width: '100%'}}
                  />

                  <CustomBtn
                    title="Take photo"
                    onBtnPress={imgFromCamera}
                    style={{width: '100%'}}
                  />
                </View>
              </View>
              {/* item name */}
              <CustomInput
                placeholder="Enter item Name"
                onChangeText={(n) => setItemName(n)}
                style={{padding: 10}}
              />

              {/* item color */}
              <CustomInput
                placeholder="color"
                onChangeText={(c) => setItemColor(c)}
                style={{padding: 10}}
              />

              {/* SIZE PICKER*/}
              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 10,
                  borderColor: '#689F38',
                  borderWidth: 1,
                }}>
                <Picker
                  selectedValue={itemSize}
                  style={{
                    height: 50,
                    // minWidth: '50%',
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setItemSize(itemValue)
                  }>
                  <Picker.Item label="FREE-SIZE" value="FREE-SIZE" />
                  <Picker.Item label="XXXL" value="XXXL" />
                  <Picker.Item label="XXL" value="XXL" />
                  <Picker.Item label="XL" value="XL" />
                  <Picker.Item label="LARGE" value="LARGE" />
                  <Picker.Item label="SMALL" value="SMALL" />
                  <Picker.Item label="EXTRA-SMALL" value="EXTRA-SMALL" />
                </Picker>
              </View>

              {/* UNIT PICKER */}
              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 10,
                  borderColor: '#689F38',
                  borderWidth: 1,
                }}>
                <Picker
                  selectedValue={unit}
                  style={{
                    height: 50,
                    // width: 150,
                  }}
                  onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}>
                  <Picker.Item label="Pcs" value="Pcs" />
                  <Picker.Item label="Metre" value="Metre" />
                  <Picker.Item label="Kg" value="Kg" />
                  <Picker.Item label="L (litre)" value="L (litre)" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>

              {/* item unitRate */}
              <CustomInput
                placeholder="unitRate"
                onChangeText={(unt) => setUnitRate(unt)}
                keyboardType="numeric"
                style={{padding: 10}}
              />

              {/* quantity */}
              <CustomInput
                placeholder="Quantity"
                onChangeText={(qnt) => setQuantity(qnt)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />

              {/* Description */}
              <CustomInput
                placeholder="Description"
                onChangeText={(des) => setDescription(des)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <CustomBtn title="Submit" onBtnPress={add_stock} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({stock}) => ({
  stock,
});

export default connect(mapStateToProps)(AddStock);
