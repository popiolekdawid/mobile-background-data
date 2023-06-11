import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function App() {
  const imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF.jpg/1399px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF.jpg' //0.786 mb
  const txtUrl = 'https://www.gutenberg.org/files/996/996-0.txt' //2.3 mb
  const zipUrl = 'https://www.gutenberg.org/files/996/996-h.zip' //60 mb

  const [url, setUrl] = useState(zipUrl);
  const [fileInfo, setFileInfo] = useState(null);

  const handlePressImg = () => {
    setUrl(imgUrl);
  }

  const handlePressTxt = () => {
    setUrl(txtUrl);
  }

  const handlePressZip = () => {
    setUrl(zipUrl);
  }

  const handleDownloadInformation = async () => {
    try {
      const response = await fetch(url);
      const contentType = response.headers.get('content-type') || 'Unknown'

      const contentLength = response.headers.get('content-length') 
      const fileLength = contentLength ? (parseFloat(contentLength) / 1000000).toFixed(2).toString().concat(' mb') : 'Unknown'
      
      setFileInfo({
        size: fileLength,
        type: contentType
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row',  columnGap: 20, padding: 20}}>
        <Button title='img' onPress={handlePressImg} />
        <Button title='txt' onPress={handlePressTxt} />
        <Button title='zip' onPress={handlePressZip} />
      </View>
      <TextInput
        style={{ height: 40, width: 300, borderWidth: 1, padding: 10, marginBottom: 20 }}
        onChangeText={text => setUrl(text)}
        value={url}
      />
      <Button title="Download Information" onPress={handleDownloadInformation} />
      {fileInfo && (
        <View style={{ marginTop: 20 }}>
          <Text>File Size: {fileInfo.size}</Text>
          <Text>File Type: {fileInfo.type}</Text>
        </View>
      )}
    </View>
  );
}
