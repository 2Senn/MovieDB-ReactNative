import { dimensions } from '../../constants/style'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, View, TextInput } from 'react-native'

const SPACING = 10

const InputCustom = ({ field, form, ...props }) => {

  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: SPACING }}>
        <Text
          style={{
            fontSize: 24,
            color: '#000'
          }}
        >
          {props.label}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: SPACING
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: '#00000040',
            padding: 10,
            backgroundColor: '#ffffff80',
            elevation: 20,
            marginBottom: SPACING
          }}
          placeholder={props.ph}
          editable={true}
          value={form.values[field.name]}
          secureTextEntry={field.name == "password" ? true : false}
          onChangeText={form.handleChange(field.name)}
          onBlur={() => form.setFieldTouched(field.name)}
        />
      </View>
    </View>
  )
}

export default InputCustom
